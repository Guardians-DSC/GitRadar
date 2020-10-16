import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/cadastrar" component={SignUp} />
    <Route exact path="/dashboard" isPrivate component={Dashboard} />
  </Switch>
);

export default Routes;
