import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default Routes;
