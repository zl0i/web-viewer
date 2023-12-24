import axios from "axios";
import { useAuth } from "react-oidc-context";

const host = "armybots.ru"

export function useSystemAPI() {
    const auth = useAuth()


    return {
        async registrToken(token: string) {
            const res = await axios.post(`https://${host}/api/push-service/users/registr-token`, {
                device: "web",
                token: token
            },
                {
                    headers: {
                        Authorization: `Bearer ${auth.user?.access_token}`
                    }
                })
            return res.data
        }
    }

}