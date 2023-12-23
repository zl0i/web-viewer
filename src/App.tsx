import { useEffect, useState } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import { Route, Link, Routes } from 'react-router-dom';

import AircraftsPage from './pages/Aircrafts';
import { AirbasesPage } from './pages/Airbases';

import './App.css';
import { HomePage } from './pages/Home';
import { MapPage } from './pages/Map';

export default function App() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  if (auth.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>;
  }

  return (
    <>
      <header>
        <Link to={`/`}>Home</Link>
        <Link to={`${import.meta.env.BASE_URL}/airbase`}>Airbases</Link>
        <Link to={`${import.meta.env.BASE_URL}/aircrafts`}>Aircrafts</Link>
        <Link to={`${import.meta.env.BASE_URL}/map`}>Map</Link>
        <button onClick={() => void auth.removeUser()}>Log out</button>
        <hr />
      </header>
      <Routes>
        <Route path={`/`} element={<HomePage />}></Route>
        <Route path={`${import.meta.env.BASE_URL}/airbase`} element={<AirbasesPage />}></Route>
        <Route path={`${import.meta.env.BASE_URL}/aircrafts`} element={<AircraftsPage />}></Route>
        <Route path={`${import.meta.env.BASE_URL}/map`} element={<MapPage />}></Route>
      </Routes>
    </>
  );
}
