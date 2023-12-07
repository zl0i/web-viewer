import { Aircrafts } from '../api/flights';

export default function AircraftRow(ac: Aircrafts) {
  return (
    <tr key={ac.reg}>
      <td>{ac.hexcode}</td>
      <td>{ac.reg}</td>
      <td>{ac.type}</td>
      <td>{ac.icao_type}</td>
      <td>{ac.long_type}</td>
      <td>{ac.country}</td>
      <td>{`${ac.air_squadron ?? 'N'} sq ${ac.air_group ?? 'N'} group ${ac.air_wing ?? 'N'} wing ${ac.air_forse ?? 'N'} force ${ac.air_command ?? 'N'}`}</td>
      <td>{`${ac.air_squadron_alt ?? 'N'} sq ${ac.air_group_alt ?? 'N'} group ${ac.air_wing_alt ?? 'N'} wing ${ac.air_forse_alt ?? 'N'} force ${ac.air_command_alt ?? 'N'}`}</td>
    </tr>
  );
}
