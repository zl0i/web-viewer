import { useMemo, useState } from 'react';
import Dialog from './Dialog';

import './EditAircraftDialog.css';
import { Aircrafts } from '../api/flights';
import { awForFC, fcForCM, sqForAW } from '../utils/airForceMapper';

export default function EditAircraftDialog({ aircraft, photos, isOpen, setIsOpen, setUpdateAircraft }: any) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inAircraft, setInAircraft] = useState(aircraft as Aircrafts);

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
              <div>
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
              <input
                type="number"
                defaultValue={inAircraft ? inAircraft.id_airbase : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    id_airbase: Number(e.target.value),
                  })
                }
              />
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
                type="number"
                defaultValue={inAircraft ? inAircraft.id_airbase_alt : ''}
                onChange={(e) =>
                  setInAircraft({
                    ...inAircraft,
                    id_airbase_alt: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="air-force-mapper">
            <div>aw for current sq: {sqForAW(inAircraft?.air_squadron).join(', ') || 'unknown'}</div>
            <div>fc for current aw: {awForFC(inAircraft?.air_wing).join(', ') || 'unknown'}</div>
            <div>cm for current fc: {fcForCM(inAircraft?.air_forse).join(', ') || 'unknown'}</div>
          </div>
          <div className="dialog-button-box">
            <button onClick={() => setUpdateAircraft(inAircraft)}>Access</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
