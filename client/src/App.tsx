import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from './pages/Home';
import { routes } from './routes';
import ConnectedRouter from './components/ConnectedRouter';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <ConnectedRouter>
        <Route path={routes.LOGIN.path} component={Login} />
        <Route path={routes.SIGNUP.path} component={SignUp} />
        <MainLayout>
          <Route component={Home} path={routes.HOME.path} exact={routes.HOME.exact} />
          <Route component={Profile} path={routes.PROFILE.path} exact={routes.PROFILE.exact} />
        </MainLayout>
        <Redirect path='*' to='/' />
      </ConnectedRouter>
    </>
  );
}

export default App;
