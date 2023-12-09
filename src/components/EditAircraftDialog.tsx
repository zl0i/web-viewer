import { useMemo, useState } from 'react';
import Dialog from './Dialog';

import './EditAircraftDialog.css';

export default function EditAircraftDialog({ aircraft, photos, isOpen, setIsOpen }: any) {
  const [photoIndex, setPhotoIndex] = useState(0);

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
        <div>
          {aircraft?.type || aircraft?.icao_type} {aircraft?.country}
        </div>
        <div className="force">
          <div>
            <span>squadron:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_squadron : ''} />
            <span>group:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_group : ''} />
            <span>wing:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_wing : ''} />
            <span>force:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_forse : ''} />
            <span>command:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_command : ''} />
            <span>airbase:</span>
            <input type="text" defaultValue={aircraft ? aircraft.id_airbase : ''} />
          </div>
          <div>
            <span>alt_squadron:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_squadron_alt : ''} />
            <span>alt_group:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_group_alt : ''} />
            <span>alt_wing:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_wing_alt : ''} />
            <span>alt_force:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_forse_alt : ''} />
            <span>alt_command:</span>
            <input type="text" defaultValue={aircraft ? aircraft.air_command_alt : ''} />
            <span>alt_airbase:</span>
            <input type="text" defaultValue={aircraft ? aircraft.id_airbase_alt : ''} />
          </div>
        </div>
        <div>
          <button>Access</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </Dialog>
  );
}
