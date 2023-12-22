import { PropsWithChildren } from 'react';
import { Airbase } from '../api/flightsV2';

import './AirbaseRow.css';

interface AirbaseRowProps extends PropsWithChildren {
  airbase: Airbase;
  clickEdit: (airbase: Airbase) => void;
  clickDelete: (id: number) => void;
}

export function AirbaseRow(props: AirbaseRowProps) {
  const { airbase, clickEdit, clickDelete } = props;

  return (
    <tr>
      <td>{airbase.id}</td>
      <td>{airbase.name}</td>
      <td>{airbase.icao}</td>
      <td>{airbase.type}</td>
      <td>{airbase.country}</td>
      <td>{airbase.continent}</td>
      <td className="center-text">
        <button onClick={() => clickEdit(airbase)}>Edit</button>
      </td>
      <td className="center-text">
        <button onClick={() => clickDelete(airbase.id)}>Delete</button>
      </td>
    </tr>
  );
}
