import { useMemo, useState } from 'react';
import Dialog from './Dialog';

import './EditAircraftDialog.css';
import { awForFC, fcForCM, sqForAW } from '../utils/airForceMapper';
import { useAirbasesStore } from '../store/airbases';
import debounce from 'debounce';
import { Aircraft } from '../api/flightsV2';

export default function EditAircraftDialog({ aircraft, photos, isOpen, setIsOpen, patchAircraft, nextAircraft }: any) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inAircraft, setInAircraft] = useState(aircraft as Aircraft);

  const [nameAirbase, setNameAirbase] = useState('');
  const [nameAirbaseAlt, setNameAirbaseAlt] = useState('');

  const getAirbaseById = useAirbasesStore((state) => state.byId);
  const getAirbaseByName = useAirbasesStore((state) => state.byName);
  const matchAirbases = useAirbasesStore((state) => state.match);

  useMemo(() => {
    setInAircraft(aircraft);
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
              <div className="air-photo" >
                <img src={photos[photoIndex]?.source_link}></img>
                <span>{photos[photoIndex]?.date}</span>
              </div>
            )}
          </div>
          <div className="air-photos-control">
            <span>{`${photoIndex + 1}/${photos?.length}`}</span>
            <button onClick={prevPhoto}>Prev</button>
            <button onClick={nextPhoto}>Next</button>
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
                defaultValue={inAircraft ? inAircraft.type : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    type: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <div>long type:</div>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.long_type : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    long_type: e.target.value,
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
                defaultValue={inAircraft ? inAircraft.air_squadron : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_squadron: e.target.value,
                  })
                }
              />
              <span>group:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_group : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_group: e.target.value,
                  })
                }
              />
              <span>wing:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_wing : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_wing: e.target.value,
                  })
                }
              />
              <span>force:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_forse : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_forse: e.target.value,
                  })
                }
              />
              <span>command:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_command : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_command: e.target.value,
                  })
                }
              />
              <span>airbase:</span>
              <input type="items" list="airbases" defaultValue={inAircraft ? getAirbaseById(inAircraft.id_airbase)?.name : ''} onChange={debounce((e) => setNameAirbase(e.target.value), 500)} />
              <datalist id="airbases">
                {matchAirbases(nameAirbase).map((a) => (
                  <option value={a.name} key={a.id} />
                ))}
              </datalist>
              <div className="air-force-mapper">
                <div>aw for current sq: {sqForAW(inAircraft?.air_squadron).join(', ') || 'unknown'}</div>
                <div>fc for current aw: {awForFC(inAircraft?.air_wing).join(', ') || 'unknown'}</div>
                <div>cm for current fc: {fcForCM(inAircraft?.air_forse).join(', ') || 'unknown'}</div>
              </div>
            </div>
            <div>
              <span>alt_squadron:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_squadron_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_squadron_alt: e.target.value,
                  })
                }
              />
              <span>alt_group:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_group_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_group_alt: e.target.value,
                  })
                }
              />
              <span>alt_wing:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_wing_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_wing_alt: e.target.value,
                  })
                }
              />
              <span>alt_force:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_forse_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_forse_alt: e.target.value,
                  })
                }
              />
              <span>alt_command:</span>
              <input
                type="text"
                defaultValue={inAircraft ? inAircraft.air_command_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    air_command_alt: e.target.value,
                  })
                }
              />
              <span>alt_airbase:</span>
              <input
                type="items"
                list="alt_airbases"
                defaultValue={inAircraft ? getAirbaseById(inAircraft.id_airbase_alt)?.name : ''}
                onChange={debounce((e) => setNameAirbaseAlt(e.target.value), 500)}
              />
              <datalist id="alt_airbases">
                {matchAirbases(nameAirbaseAlt).map((a) => (
                  <option value={a.name} key={a.id} />
                ))}
              </datalist>
              <div className="air-force-mapper">
                <div>aw for current sq: {sqForAW(inAircraft?.air_squadron_alt).join(', ') || 'unknown'}</div>
                <div>fc for current aw: {awForFC(inAircraft?.air_wing_alt).join(', ') || 'unknown'}</div>
                <div>cm for current fc: {fcForCM(inAircraft?.air_forse_alt).join(', ') || 'unknown'}</div>
              </div>
            </div>
          </div>
          <div className="dialog-button-box">
            <button
              onClick={() => {
                patchAircraft({
                  ...inAircraft,
                  id_airbase: getAirbaseByName(nameAirbase)?.id,
                  id_airbase_alt: getAirbaseByName(nameAirbaseAlt)?.id,
                });
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                patchAircraft({
                  ...inAircraft,
                  id_airbase: getAirbaseByName(nameAirbase)?.id,
                  id_airbase_alt: getAirbaseByName(nameAirbaseAlt)?.id,
                });
                nextAircraft(inAircraft.reg)
              }}
            >
              Update and Next
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
