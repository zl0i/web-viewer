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
  const fillAirbases = useAirbasesStore((state) => state.fill);

  useMemo(() => {
    if (editAircraft.reg) {
      console.log('update photo')
      setPhotos([]);
      flightAPI.fetchAircraftPhotos(editAircraft.hexcode).then(setPhotos);
    }
  }, [editAircraft]);

  function patchAircraft(aircraft: Aircraft, next: boolean = false) {
    if (aircraft.reg) {
      flightAPI
        .patchAircraft(aircraft)
        .then(() => {
          const index = aircrafts.findIndex((a) => a.reg == aircraft.reg);
          aircrafts[index] = aircraft;
          setAircrafts(aircrafts);
          if (next) {
            nextAircraft(aircraft.reg);
          } else {
            setIsOpen(false);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  function nextAircraft(from_reg: string) {
    const index = filteredAircrafts.findIndex((a) => a.reg == from_reg);
    const newEditAircraft = filteredAircrafts[index + 1];
    if (newEditAircraft) {
      console.log('set edit aircraft')
      setEditAircraft(newEditAircraft);
    }
  }

  function deleteAircraftPhoto(id: number) {
    flightAPI
      .deleteAircraftPhoto(id)
      .then(() => flightAPI.fetchAircraftPhotos(editAircraft.hexcode))
      .then((data) => {
        setPhotos(data);
      });
  }

  const [filter, setFilter] = useState({
    hexcode: null as null | string,
    reg: null as null | string,
    type: null as null | string,
    country: null as null | string,
    force: null as null | string,
    last_update_sign: 'after' as 'before' | 'after',
    last_update: null as null | string,
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
        if (filter.last_update) {
          if (filter.last_update_sign == 'after' && new Date(ac.update_date).getTime() < new Date(filter.last_update).getTime()) {
            return false;
          } else if (filter.last_update_sign == 'before' && new Date(ac.update_date).getTime() > new Date(filter.last_update).getTime()) {
            return false;
          }
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

      <EditAircraftDialog {...{ aircraft: editAircraft, photos: photos, isOpen, setIsOpen, patchAircraft, nextAircraft, deleteAircraftPhoto }} />
    </div>
  );
}
