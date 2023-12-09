import { useMemo, useState } from 'react';
import Dialog from './Dialog';

import './EditAircraftDialog.css';
import { Aircrafts } from '../api/flights';

export default function EditAircraftDialog({ aircraft, photos, isOpen, setIsOpen, setUpdateAircraft }: any) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const updateAircraft = aircraft as Aircrafts;

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
              {aircraft?.type || aircraft?.icao_type} {aircraft?.country}
            </div>
            <div>
              <div>type:</div>
              <input type="text" defaultValue={aircraft ? aircraft.type : ''} onChange={(e) => (updateAircraft.type = e.target.value)} />
            </div>
            <div>
              <div>long type:</div>
              <input type="text" defaultValue={aircraft ? aircraft.long_type : ''} onChange={(e) => (updateAircraft.long_type = e.target.value)} />
            </div>
          </div>
          <div className="force">
            <div>
              <span>squadron:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_squadron : ''} onChange={(e) => (updateAircraft.air_squadron = e.target.value)} />
              <span>group:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_group : ''} onChange={(e) => (updateAircraft.air_group = e.target.value)} />
              <span>wing:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_wing : ''} onChange={(e) => (updateAircraft.air_wing = e.target.value)} />
              <span>force:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_forse : ''} onChange={(e) => (updateAircraft.air_forse = e.target.value)} />
              <span>command:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_command : ''} onChange={(e) => (updateAircraft.air_command = e.target.value)} />
              <span>airbase:</span>
              <input type="number" defaultValue={aircraft ? aircraft.id_airbase : ''} onChange={(e) => (updateAircraft.id_airbase = Number(e.target.value))} />
            </div>
            <div>
              <span>alt_squadron:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_squadron_alt : ''} onChange={(e) => (updateAircraft.air_squadron_alt = e.target.value)} />
              <span>alt_group:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_group_alt : ''} onChange={(e) => (updateAircraft.air_group_alt = e.target.value)} />
              <span>alt_wing:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_wing_alt : ''} onChange={(e) => (updateAircraft.air_wing_alt = e.target.value)} />
              <span>alt_force:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_forse_alt : ''} onChange={(e) => (updateAircraft.air_forse_alt = e.target.value)} />
              <span>alt_command:</span>
              <input type="text" defaultValue={aircraft ? aircraft.air_command_alt : ''} onChange={(e) => (updateAircraft.air_command_alt = e.target.value)} />
              <span>alt_airbase:</span>
              <input type="number" defaultValue={aircraft ? aircraft.id_airbase_alt : ''} onChange={(e) => (updateAircraft.id_airbase_alt = Number(e.target.value))} />
            </div>
          </div>
          <div>
            <button onClick={() => setUpdateAircraft(updateAircraft)}>Access</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
