import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { User, WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig: AuthProviderProps = {
  authority: 'https://auth.zloi.space/realms/bots/',
  client_id: 'bots',
  redirect_uri: 'http://localhost:5173',
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
