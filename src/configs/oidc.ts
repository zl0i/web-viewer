import { User, WebStorageStateStore } from 'oidc-client-ts';
import { AuthProviderProps } from 'react-oidc-context';

export const oidcConfig: AuthProviderProps = {
    authority: 'https://auth.zloi.space/realms/bots/',
    client_id: 'bots',
    redirect_uri: `${window.location.protocol}//${window.location.host}/${import.meta.env.BASE_URL}`,
    onSigninCallback: (_user: User | void): void => {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
    userStore: new WebStorageStateStore({ store: window.localStorage }),
};