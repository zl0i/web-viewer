import { useMemo, useState } from 'react';
import Dialog from './Dialog';

import './EditAircraftDialog.css';
import { cmForAW, afForAW, sqForAW } from '../utils/airForceMapper';
import { useAirbasesStore } from '../store/airbases';
import debounce from 'debounce';
import { Aircraft } from '../api/flightsV2';

export default function EditAircraftDialog({ aircraft, photos, isOpen, setIsOpen, patchAircraft, deleteAircraftPhoto, nextAircraft }: any) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inAircraft, setInAircraft] = useState(aircraft as Aircraft);

  const [nameAirbase, setNameAirbase] = useState('');
  const [nameAirbaseAlt, setNameAirbaseAlt] = useState('');

  const getAirbaseById = useAirbasesStore((state) => state.byId);
  const getAirbaseByName = useAirbasesStore((state) => state.byName);
  const matchAirbases = useAirbasesStore((state) => state.match);

  useMemo(() => {
    setInAircraft(aircraft);
    setNameAirbase(aircraft.id_airbase ? getAirbaseById(aircraft.id_airbase)?.name ?? '' : '');
    setNameAirbaseAlt(aircraft.id_airbase_alt ? getAirbaseById(aircraft.id_airbase_alt)?.name ?? '' : '');
  }, [aircraft]);

  useMemo(() => {
    setPhotoIndex(0);
  }, [photos]);

  function nextPhoto() {
    if (photoIndex < photos.length - 1) setPhotoIndex(photoIndex + 1);
  }

  function prevPhoto() {
    if (photoIndex > 0) setPhotoIndex(photoIndex - 1);
  }

  return (
    <Dialog
      {...{
        isOpen,
        setIsOpen,
      }}
    >
      <div className="edit-aircraft-dialog">
        <div>
          <div className="air-photo">
            {photos.length == 0 ? (
              'No photos'
            ) : (
              <div className="air-photo">
                <img src={photos[photoIndex]?.source_link}></img>
                <span>{photos[photoIndex]?.date}</span>
              </div>
            )}
          </div>
          <div className="air-photos-control">
            <span>{`${photoIndex + 1}/${photos?.length}`}</span>
            <button onClick={prevPhoto}>Prev</button>
            <button onClick={nextPhoto}>Next</button>
            <button onClick={() => deleteAircraftPhoto(photos[photoIndex].id)}>Delete</button>
          </div>
        </div>
        <div>
          <div>
            <div>
              {inAircraft?.type || inAircraft?.icao_type} {inAircraft?.country} ({inAircraft.reg},{inAircraft.hexcode})
            </div>
            <div>
              <div>type:</div>
              <input
                type="text"
                value={inAircraft?.type ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    type: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div>
              <div>long type:</div>
              <input
                type="text"
                value={inAircraft?.long_type ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    long_type: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <div className="force">
            <div>
              <span>squadron:</span>
              <input
                type="text"
                value={inAircraft?.air_squadron ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_squadron: e.currentTarget.value || null,
                  })
                }
              />
              <span>group:</span>
              <input
                type="text"
                value={inAircraft?.air_group ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_group: e.currentTarget.value || null,
                  })
                }
              />
              <span>wing:</span>
              <input
                type="text"
                value={inAircraft?.air_wing ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_wing: e.currentTarget.value || null,
                  })
                }
              />
              <span>force:</span>
              <input
                type="text"
                value={inAircraft?.air_forse ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_forse: e.currentTarget.value || null,
                  })
                }
              />
              <span>command:</span>
              <input
                type="text"
                value={inAircraft?.air_command ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_command: e.currentTarget.value || null,
                  })
                }
              />
              <span>airbase:</span>
              <input
                type="items"
                list="airbases"
                defaultValue={inAircraft?.id_airbase ? getAirbaseById(inAircraft.id_airbase)?.name : ''}
                onChange={debounce((e) => {
                  setNameAirbase(e.target.value);
                }, 500)}
              />
              <datalist id="airbases">
                {matchAirbases(nameAirbase).map((a) => (
                  <option value={a.name} key={a.id} />
                ))}
              </datalist>
              <div className="air-force-mapper">
                <div>sq for current aw: {sqForAW(inAircraft?.air_wing).join(', ') || 'unknown'}</div>
                <div>af for current aw: {afForAW(inAircraft?.air_wing).join(', ') || 'unknown'}</div>
                <div>cm for current aw: {cmForAW(inAircraft?.air_wing).join(', ') || 'unknown'}</div>
              </div>
            </div>
            <div>
              <span>alt_squadron:</span>
              <input
                type="text"
                value={inAircraft?.air_squadron_alt ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_squadron_alt: e.currentTarget.value || null,
                  })
                }
              />
              <span>alt_group:</span>
              <input
                type="text"
                value={inAircraft?.air_group_alt ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_group_alt: e.currentTarget.value || null,
                  })
                }
              />
              <span>alt_wing:</span>
              <input
                type="text"
                value={inAircraft.air_wing_alt ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_wing_alt: e.currentTarget.value || null,
                  })
                }
              />
              <span>alt_force:</span>
              <input
                type="text"
                value={inAircraft?.air_forse_alt ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_forse_alt: e.currentTarget.value || null,
                  })
                }
              />
              <span>alt_command:</span>
              <input
                type="text"
                value={inAircraft?.air_command_alt ?? ''}
                onInput={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_command_alt: e.currentTarget.value || null,
                  })
                }
              />
              <span>alt_airbase:</span>
              <input
                type="items"
                list="alt_airbases"
                defaultValue={inAircraft?.id_airbase_alt ? getAirbaseById(inAircraft.id_airbase_alt)?.name : ''}
                onInput={debounce((e) => {
                  setNameAirbaseAlt(e.target.value);
                }, 500)}
              />
              <datalist id="alt_airbases">
                {matchAirbases(nameAirbaseAlt).map((a) => (
                  <option value={a.name} key={a.id} />
                ))}
              </datalist>
              <div className="air-force-mapper">
                <div>sq for current aw: {sqForAW(inAircraft?.air_wing_alt).join(', ') || 'unknown'}</div>
                <div>af for current aw: {afForAW(inAircraft?.air_wing_alt).join(', ') || 'unknown'}</div>
                <div>cm for current aw: {cmForAW(inAircraft?.air_wing_alt).join(', ') || 'unknown'}</div>
              </div>
            </div>
          </div>
          <div className="dialog-button-box">
            <button
              onClick={() => {
                patchAircraft({
                  ...inAircraft,
                  id_airbase: nameAirbase.length > 0 ? getAirbaseByName(nameAirbase)?.id : null,
                  id_airbase_alt: nameAirbaseAlt.length > 0 ? getAirbaseByName(nameAirbaseAlt)?.id : null,
                });
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                patchAircraft(
                  {
                    ...inAircraft,
                    id_airbase: nameAirbase.length > 0 ? getAirbaseByName(nameAirbase)?.id ?? null : null,
                    id_airbase_alt: nameAirbaseAlt.length > 0 ? getAirbaseByName(nameAirbaseAlt)?.id ?? null : null,
                  },
                  true
                );
              }}
            >
              Update and Next
            </button>
            <button
              onClick={() => {
                nextAircraft(inAircraft.reg);
              }}
            >
              Next
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
