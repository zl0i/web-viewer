import { memo, useMemo, useState } from 'react';

import { Airbase, useFlightAPI } from '../api/flightsV2';
import { useAirbasesStore } from '../store/airbases';
import { AirbaseRow } from '../components/AirbaseRow';
import { EditAirbaseDialog } from '../components/EditAirbaseDialog';
import debounce from 'debounce';

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

  function updateAirbase(airbase: Partial<Airbase>) {
    // console.log(airbase);
    flightAPI.airbases
      .update(airbase.id!, airbase)
      .then((_) => {
        setIsOpen(false);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return (
    <div className="aircrafts-page">
      <span>Name:</span>
      <input
        type="text"
        onChange={debounce((e) => {
          setNameFilter(e.target.value);
        })}
      />
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
            <AirbaseRow airbase={a} key={a.id} clickEdit={(airbase) => clickEditAirbase(airbase)} />
          ))}
        </tbody>
      </table>
      <EditAirbaseDialog isOpen={isOpen} setIsOpen={setIsOpen} airbase={editAirbase} clickUpdate={(airbase) => updateAirbase(airbase)}></EditAirbaseDialog>
    </div>
  );
});

export { AirbasesPage };
