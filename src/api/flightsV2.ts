import axios from "axios";
import { useAuth } from "react-oidc-context";

const host = "armybots.ru"

export type Aircraft = {
    reg: string,
    hexcode: string,
    type: string,
    icao_type: string,
    long_type: string,
    country: string,
    air_squadron: string,
    air_group: string,
    air_wing: string,
    air_forse: string,
    air_command: string,
    id_airbase: number,
    air_squadron_alt: string,
    air_group_alt: string,
    air_wing_alt: string,
    air_forse_alt: string,
    air_command_alt: string,
    id_airbase_alt: number,
    version: number,
    update_date: string
}

export type AircraftPhoto = {
    id: number,
    hexcode: string,
    source_link: string,
    own_link: string,
    hash: string,
    date: string,
    location: string
}

export type Airbase = {
    id: number,
    name: string,
    lat: number,
    lon: number,
    country: string,
    type: string,
    icao: string,
    elevation: number,
    continent: string
}

export function useFlightAPI() {
    const auth = useAuth()

    return {
        fetchAllAircrafts: async () => {
            const res = await axios.get(`https://${host}/api/flights-bot/aircrafts`, {
                headers: {
                    Authorization: `Bearer ${auth.user?.access_token}`
                }
            })
            return res.data
        },
        fetchAllAirbases: async () => {
            const res = await axios.get(`https://${host}/api/flights-bot/airbases`, {
                headers: {
                    Authorization: `Bearer ${auth.user?.access_token}`
                }
            })
            return res.data
        },
        fetchAircraftPhotos: async (hexcode: string) => {
            const res = await axios.get(`https://${host}/api/flights-bot/flight-photos?hexcode=${hexcode}`, {
                headers: {
                    Authorization: `Bearer ${auth.user?.access_token}}`
                }
            })
            return res.data
        },
        patchAircraft: async (aircraft: Aircraft) => {
            const res = await axios.patch(`https://${host}/api/flights-bot/aircrafts/${aircraft.reg}`, aircraft, {
                headers: {
                    Authorization: `Bearer ${auth.user?.access_token}`
                }
            })
            return res.data
        }
    }
}
