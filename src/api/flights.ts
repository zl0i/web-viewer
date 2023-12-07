import axios from "axios";

const host = "armybots.ru"

export type Aircrafts = {
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

export async function fetchAllAircrafts(token: string) {
    
    const res = await axios.get(`https://${host}/api/flights-bot/aircrafts`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
}