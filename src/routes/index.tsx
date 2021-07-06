import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Total from '../pages/totais';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/total" component={Total} />
  </Switch>
);

export default Routes;
