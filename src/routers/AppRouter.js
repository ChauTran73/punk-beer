import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../components/NotFound';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import HomePage from '../components/HomePage';


const AppRouter = () => (
  <BrowserRouter>
    <div>
     
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/login" component={Login} exact={true}/>
        <Route path="/signup" component={SignUp} exact={true} />
        <Route path="/favorite" component={Favorite} exact={true} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;