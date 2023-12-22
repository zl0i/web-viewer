import { useEffect, useMemo, useState } from 'react';
import { useAuth } from 'react-oidc-context';

import FilterAircrafts from '../components/FilterAircrafts';
import EditAircraftDialog from '../components/EditAircraftDialog';
import { parceAircraftsForMapper } from '../utils/airForceMapper';
import { useAirbasesStore } from '../store/airbases';
import { AircraftPhoto, Aircraft, useFlightAPI } from '../api/flightsV2';
import AircraftRow from '../components/AircraftRow';

import './Aircrafts.css';

export default function AircraftsPage() {
  const auth = useAuth();

  const flightAPI = useFlightAPI();

  const [aircrafts, setAircrafts] = useState([] as Aircraft[]);
  const [photos, setPhotos] = useState([] as AircraftPhoto[]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([] as Aircraft[]);
  const [editAircraft, setEditAircraft] = useState({} as Aircraft);
  const fillAirbases = useAirbasesStore((state) => state.fill);

  useMemo(() => {
    if (editAircraft.reg) {
      setPhotos([]);
      flightAPI.aircraftPhotos.fetchByHex(editAircraft.hexcode).then(setPhotos);
    }
  }, [editAircraft]);

  function patchAircraft(aircraft: Aircraft, next: boolean = false) {
    if (aircraft.reg) {
      flightAPI.aircrafts
        .update(aircraft)
        .then(() => {
          const index = aircrafts.findIndex((a) => a.reg == aircraft.reg);
          aircrafts[index] = aircraft;
          // setAircrafts(aircrafts);
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
      setEditAircraft(newEditAircraft);
    }
  }

  function deleteAircraftPhoto(id: number) {
    flightAPI.aircraftPhotos
      .delete(id)
      .then(() => flightAPI.aircraftPhotos.fetchByHex(editAircraft.hexcode))
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
    if (auth.isAuthenticated) {
      flightAPI.aircrafts.fetch().then((aircrafts) => {
        setAircrafts(aircrafts);
        parceAircraftsForMapper(aircrafts);
      });
      flightAPI.airbases.fetch().then(fillAirbases);
    }
  }, [auth]);

  return (
    <div className="aircrafts-page">
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
