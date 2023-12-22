import { memo, useMemo, useState } from 'react';
import { Airbase } from '../api/flightsV2';
import Dialog from './Dialog';

interface EditAirbaseDialogProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  airbase?: Airbase;
  clickCreateOrUpdate: (airbase: Partial<Airbase>) => void;
}

const EditAirbaseDialog = memo(({ airbase, isOpen, setIsOpen, clickCreateOrUpdate }: EditAirbaseDialogProps) => {
  const [editAirbase, setEditAirbase] = useState<Partial<Airbase>>({});

  useMemo(() => {
    airbase && setEditAirbase(airbase);
  }, [airbase]);

  return (
    <>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <div>Name:</div>
          <input
            type="text"
            defaultValue={editAirbase?.name}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                name: e.target.value,
              })
            }
          ></input>
          <div>Coordinate:</div>
          <input
            type="number"
            defaultValue={editAirbase?.lat}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                lat: Number(e.target.value),
              })
            }
          ></input>
          <input
            type="number"
            defaultValue={editAirbase?.lon}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                lon: Number(e.target.value),
              })
            }
          ></input>
          <div>Type:</div>
          <input
            type="text"
            defaultValue={editAirbase?.type}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                type: e.target.type,
              })
            }
          ></input>
          <div>ICAO:</div>
          <input
            type="text"
            defaultValue={editAirbase?.icao}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                icao: e.target.value,
              })
            }
          ></input>
          <div>Elevation:</div>
          <input
            type="number"
            defaultValue={editAirbase?.elevation}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                elevation: Number(e.target.value),
              })
            }
          ></input>
          <div>Country:</div>
          <input
            type="text"
            defaultValue={editAirbase?.country}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                country: e.target.value,
              })
            }
          ></input>
          <div>Continent:</div>
          <input
            type="text"
            defaultValue={editAirbase?.continent}
            onChange={(e) =>
              setEditAirbase({
                ...editAirbase,
                continent: e.target.value,
              })
            }
          ></input>
          <div className="dialog-button-box">
            <button
              onClick={() => {
                if (editAirbase) {
                  clickCreateOrUpdate(editAirbase);
                }
              }}
            >
              {editAirbase.id ? 'Update' : 'Create'}
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </Dialog>
    </>
  );
});

export { EditAirbaseDialog };
