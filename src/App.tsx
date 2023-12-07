import { useEffect, useMemo, useState } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import { Aircrafts, fetchAllAircrafts } from './api/flights';
import AircraftRow from './components/AircraftRow';

import './App.css';
import FilterAircrafts from './components/FilterAircrafts';

export default function App() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  const [aircrafts, setAircrafts] = useState([] as Aircrafts[]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([] as Aircrafts[]);

  const [filter, setFilter] = useState({
    hexcode: null as null | string,
    reg: null as null | string,
    type: null as null | string,
    country: null as null | string,
    force: null as null | string,
  });

  useMemo(() => {
    console.log('memo');
    setFilteredAircrafts(
      aircrafts.filter((ac) => {
        let valid = true;
        if (filter.hexcode && !ac.hexcode.match(new RegExp(filter.hexcode, 'gi'))) {
          return false;
        }
        if (filter.reg && !ac.reg.match(new RegExp(filter.reg, 'gi'))) {
          return false;
        }
        if (filter.type && !ac.type.match(new RegExp(filter.type, 'gi'))) {
          return false;
        }
        if (filter.country && !ac.country.match(new RegExp(filter.country, 'gi'))) {
          return false;
        }
        // if (filter.force && ac.air.includes(filter.force)) {
        //   valid = true;
        // }
        return valid;
      })
    );
  }, [aircrafts, filter]);

  useEffect(() => {
    if (auth.user) {
      fetchAllAircrafts(auth.user?.access_token).then((aircrafts) => {
        setAircrafts(aircrafts);
      });
    }
  }, [auth]);

  if (auth.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => void auth.removeUser()}>Log out</button>
      </div>
      <div>{FilterAircrafts(filter, setFilter)}</div>
      <div>{filter.hexcode}</div>
      <table>
        <thead>
          <tr>
            <th>hexcode</th>
            <th>Reg</th>
            <th>Type</th>
            <th>ICAO Type</th>
            <th>Long Type</th>
            <th>Country</th>
            <th>Force</th>
            <th>Alt Force</th>
          </tr>
        </thead>
        <tbody>{filteredAircrafts.map((ac) => AircraftRow(ac))}</tbody>
      </table>
    </div>
  );
}
