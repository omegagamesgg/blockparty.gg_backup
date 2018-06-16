import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import ProfilePage from './Profile';
import PlayPage from './Play';
import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import './App.css';

const App = () =>
  <Router>
    <div className="App">
      <Route exact path={ routes.LANDING } component={() => <LandingPage />} />
      <Route exact path={ routes.SIGN_UP } component={() => <SignUpPage />} />
      <Route exact path={ routes.SIGN_IN } component={() => <SignInPage />} />
      <Route exact path={ routes.PASSWORD_FORGET } component={() => <PasswordForgetPage />} />
      <Route exact path={ routes.HOME } component={() => <HomePage />} />
      <Route exact path={ routes.PROFILE } component={() => <ProfilePage />} />
      <Route exact path={ routes.PLAY } component={() => <PlayPage />} />
    </div>
  </Router>

export default withAuthentication(App);
