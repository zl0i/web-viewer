import axios from "axios";
import { useAuth } from "react-oidc-context";
import { Aircrafts } from "./flights";

const host = "armybots.ru"


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
        patchAircraft: async (aircraft: Aircrafts) => {
            const res = await axios.patch(`https://${host}/api/flights-bot/aircrafts/${aircraft.reg}`, aircraft, {
                headers: {
                    Authorization: `Bearer ${auth.user?.access_token}`
                }
            })
            return res.data
        }
    }
}
