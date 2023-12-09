import { Aircraft } from "../api/flightsV2";


export default function AircraftRow({ aircraft, setOpenDialog, setEditAircraft }: { aircraft: Aircraft; setOpenDialog: (o: boolean) => void; setEditAircraft: Function }) {
  return (
    <tr key={aircraft.reg}>
      <td>{aircraft.hexcode}</td>
      <td>{aircraft.reg}</td>
      <td>{aircraft.type}</td>
      <td>{aircraft.icao_type}</td>
      <td>{aircraft.long_type}</td>
      <td>{aircraft.country}</td>
      <td>{`${aircraft.air_squadron ?? 'N'} sq ${aircraft.air_group ?? 'N'} group ${aircraft.air_wing ?? 'N'} wing ${aircraft.air_forse ?? 'N'} force ${aircraft.air_command ?? 'N'}`}</td>
      <td>{`${aircraft.air_squadron_alt ?? 'N'} sq ${aircraft.air_group_alt ?? 'N'} group ${aircraft.air_wing_alt ?? 'N'} wing ${aircraft.air_forse_alt ?? 'N'} force ${
        aircraft.air_command_alt ?? 'N'
      }`}</td>
      <td>
        <button
          onClick={() => {
            setEditAircraft(aircraft);
            setOpenDialog(true);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
