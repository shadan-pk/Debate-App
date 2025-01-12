import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Importing the HomePage component
import LoginPage from './pages/LoginPage'; // Importing the LoginPage component
import DebatePage from './pages/DebatePage'; // Importing the DebatePage component
import TeamSelectionPage from './pages/TeamSelectionPage'; // Importing the TeamSelectionPage component
import AdminPage from './pages/AdminPage'; // Importing the AdminPage component
import SignupPage from './pages/SignupPage'; // Importing the AdminPage component

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/debates" component={DebatePage} />
      <Route path="/team-selection" component={TeamSelectionPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/SignupPage" component={SignupPage} />
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default Routes;