import { memo, useMemo, useState } from 'react';

import { Airbase, useFlightAPI } from '../api/flightsV2';
import { useAirbasesStore } from '../store/airbases';
import { AirbaseRow } from '../components/AirbaseRow';
import { EditAirbaseDialog } from '../components/EditAirbaseDialog';
import debounce from 'debounce';

import './Airbases.css';

const AirbasesPage = memo(() => {
  const flightAPI = useFlightAPI();

  const [isOpen, setIsOpen] = useState(false);
  const [editAirbase, setEditAirbase] = useState<Airbase>();
  const [nameFilter, setNameFilter] = useState('');

  const fillAirbases = useAirbasesStore((state) => state.fill);
  const airbases = useAirbasesStore((state) => state.all);
  const [filteredAirbases, setFilteredAirbases] = useState<Airbase[]>([]);

  useMemo(() => {
    flightAPI.airbases.fetch().then(fillAirbases);
  }, []);

  useMemo(() => {
    setFilteredAirbases(
      airbases.filter((a) => {
        return new RegExp(nameFilter, 'gmi').test(a.name);
      })
    );
  }, [airbases, nameFilter]);

  function clickEditAirbase(airbase: Airbase) {
    setEditAirbase(airbase);
    setIsOpen(true);
  }

  function clickNewAirbase() {
    setEditAirbase(undefined);
    setIsOpen(true);
  }

  function createOrUpdateAirbase(airbase: Partial<Airbase>) {
    if (airbase.id) {
      flightAPI.airbases
        .update(airbase.id!, airbase)
        .then((_) => {
          setIsOpen(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      flightAPI.airbases
        .create(airbase as Airbase)
        .then((_) => {
          setIsOpen(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  function deleteAirbase(id: number) {
    flightAPI.airbases
      .delete(id)
      .then((_) => flightAPI.airbases.fetch())
      .then(fillAirbases);
  }

  return (
    <div className="aircrafts-page">
      <div className="airbases-filter">
        <span>Name:</span>
        <input
          type="text"
          onChange={debounce((e) => {
            setNameFilter(e.target.value);
          })}
        />
        <button onClick={() => clickNewAirbase()}>New</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>ICAO</th>
            <th>Type</th>
            <th>Country</th>
            <th>Continent</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAirbases.map((a) => (
            <AirbaseRow airbase={a} key={a.id} clickEdit={(airbase) => clickEditAirbase(airbase)} clickDelete={(id) => deleteAirbase(id)} />
          ))}
        </tbody>
      </table>
      <EditAirbaseDialog isOpen={isOpen} setIsOpen={setIsOpen} airbase={editAirbase} clickCreateOrUpdate={(airbase) => createOrUpdateAirbase(airbase)}></EditAirbaseDialog>
    </div>
  );
});

export { AirbasesPage };
