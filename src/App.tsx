import { useEffect, useMemo, useState } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import AircraftRow from './components/AircraftRow';

import './App.css';
import FilterAircrafts from './components/FilterAircrafts';
import EditAircraftDialog from './components/EditAircraftDialog';
import { parceAircraftsForMapper } from './utils/airForceMapper';
import { useAirbasesStore } from './store/airbases';
import { AircraftPhoto, Aircraft, useFlightAPI } from './api/flightsV2';

export default function App() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const flightAPI = useFlightAPI();

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  const [aircrafts, setAircrafts] = useState([] as Aircraft[]);
  const [photos, setPhotos] = useState([] as AircraftPhoto[]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([] as Aircraft[]);
  const [editAircraft, setEditAircraft] = useState({} as Aircraft);
  const [updateAircraft, setUpdateAircraft] = useState({} as Aircraft);
  const fillAirbases = useAirbasesStore((state) => state.fill);

  useMemo(() => {
    if (editAircraft.reg) {
      setPhotos([]);
      flightAPI.fetchAircraftPhotos(editAircraft.hexcode).then(setPhotos);
    }
  }, [editAircraft]);

  useMemo(() => {
    if (updateAircraft.reg) {
      flightAPI
        .patchAircraft(updateAircraft)
        .then(() => {
          setIsOpen(false);
          const index = aircrafts.findIndex((a) => a.reg == updateAircraft.reg);
          aircrafts[index] = updateAircraft;
          setAircrafts(aircrafts);
        })
        .catch((err) => console.error(err));
    }
  }, [updateAircraft]);

  const [filter, setFilter] = useState({
    hexcode: null as null | string,
    reg: null as null | string,
    type: null as null | string,
    country: null as null | string,
    force: null as null | string,
  });

  useMemo(() => {
    setFilteredAircrafts(
      aircrafts.filter((ac) => {
        let valid = true;
        if (filter.hexcode && !ac.hexcode.match(new RegExp(filter.hexcode, 'gi'))) {
          return false;
        }
        if (filter.reg && !ac.reg.match(new RegExp(filter.reg, 'gi'))) {
          return false;
        }
        if (filter.type && !(ac.type.match(new RegExp(filter.type, 'gi')) || ac.icao_type.match(new RegExp(filter.type, 'gi')) || ac.long_type.match(new RegExp(filter.type, 'gi')))) {
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (auth.user) {
      flightAPI.fetchAllAircrafts().then((aircrafts) => {
        setAircrafts(aircrafts);
        parceAircraftsForMapper(aircrafts);
      });
      flightAPI.fetchAllAirbases().then(fillAirbases);
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
      <FilterAircrafts {...{ filter, setFilter }}></FilterAircrafts>
      <table>
        <thead>
          <tr>
            <th>hexcode</th>
            <th>Reg</th>
            <th>Type</th>
            <th>ICAO</th>
            <th>Long Type</th>
            <th>Country</th>
            <th>Force</th>
            <th>Alt Force</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{filteredAircrafts.map((a) => AircraftRow({ aircraft: a, setOpenDialog: setIsOpen, setEditAircraft }))}</tbody>
      </table>

      <EditAircraftDialog {...{ aircraft: editAircraft, photos: photos, isOpen, setIsOpen, setUpdateAircraft }} />
    </div>
  );
}
