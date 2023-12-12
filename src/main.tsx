import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import AircraftsPages from './pages/Aircrafts.tsx';

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { User, WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig: AuthProviderProps = {
  authority: 'https://auth.zloi.space/realms/bots/',
  client_id: 'bots',
  redirect_uri: `${window.location.protocol}//${window.location.host}/${import.meta.env.BASE_URL}`,
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/aircrafts',
//     element: <AircraftsPages />,
//   },
// ]);

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        {/* <RouterProvider router={router} /> */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
