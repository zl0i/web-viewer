import axios from "axios";
import { useAuth } from "react-oidc-context";

const host = "armybots.ru"

export type Flight = {
    hexcode: string,
    flight_id: string,
    reg: string,
    callsign: string,
    type: string,
    country: string,
    lat: number,
    lon: number,
    last_update: number,
    alt: number,
    airground: boolean,
    course: number,
    speed: number,
    image: string,
    image_scale: number
}

export type Aircraft = {
    reg: string,
    hexcode: string,
    type: string,
    icao_type: string,
    long_type: string,
    country: string,
    air_squadron: string | null,
    air_group: string | null,
    air_wing: string | null,
    air_forse: string | null,
    air_command: string | null,
    id_airbase: number | null,
    air_squadron_alt: string | null,
    air_group_alt: string | null,
    air_wing_alt: string | null,
    air_forse_alt: string | null,
    air_command_alt: string | null,
    id_airbase_alt: number | null,
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
        flights: {
            update: async (): Promise<Flight[]> => {
                const res = await axios.get(`https://${host}/api/flights-bot/flights`, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                })
                return res.data
            }
        },
        airbases: {
            fetch: async (): Promise<Airbase[]> => {
                const res = await axios.get(`https://${host}/api/flights-bot/airbases`, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                })
                return res.data
            },
            create: async (airbase: Airbase): Promise<Airbase[]> => {
                const res = await axios.post(`https://${host}/api/flights-bot/airbases`, airbase,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.user?.access_token}`
                        }
                    })
                return res.data
            },
            update: async (id: number, airbase: Partial<Airbase>): Promise<Airbase[]> => {
                const res = await axios.patch(`https://${host}/api/flights-bot/airbases/${id}`, airbase,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.user?.access_token}`
                        }
                    })
                return res.data
            },
            delete: async (id: number): Promise<boolean> => {
                const res = await axios.delete(`https://${host}/api/flights-bot/airbases/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.user?.access_token}`
                        }
                    })
                return res.data
            }
        },
        aircrafts: {
            fetch: async (): Promise<Aircraft[]> => {
                const res = await axios.get(`https://${host}/api/flights-bot/aircrafts`, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                })
                return res.data
            },
            update: async (aircraft: Aircraft): Promise<Aircraft> => {
                const res = await axios.patch(`https://${host}/api/flights-bot/aircrafts/${aircraft.reg}`, aircraft, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                })
                return res.data
            }
        },
        aircraftPhotos: {
            fetchByHex: async (hexcode: string): Promise<AircraftPhoto[]> => {
                const res = await axios.get(`https://${host}/api/flights-bot/flight-photos?hexcode=${hexcode}`, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}}`
                    }
                })
                return res.data
            },
            delete: async (id: number) => {
                const res = await axios.delete(`https://${host}/api/flights-bot/flight-photos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}}`
                    }
                })
                return res.data
            }
        },
    }
}
