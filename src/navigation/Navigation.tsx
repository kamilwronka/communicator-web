import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { FullScreenLoading, Layout } from 'components';

import { Home } from 'screens/home';
import { Intro } from 'screens/intro';
import { Join } from 'screens/join';
import { Server } from 'screens/server';

import { Protected } from './Protected';

const Navigation = () => {
  return (
    <Routes>
      <Route path="intro" element={<Intro />} />
      <Route
        path="join/:inviteId"
        element={
          <Protected>
            <Join />
          </Protected>
        }
      />
      <Route element={<Layout />}>
        <Route
          path="channels/@me/*"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="channels/:serverId/*"
          element={
            <Protected>
              <Server />
            </Protected>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Protected>
            <Navigate to="/channels/@me" />
          </Protected>
        }
      />
    </Routes>
  );
};

export default withAuthenticationRequired(Navigation, {
  onRedirecting: () => <FullScreenLoading />,
});
