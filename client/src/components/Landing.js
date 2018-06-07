import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import './Landing.css';

const LandingPage = ({ history }) =>
  <div className="LandingPage">
    <div className="Title">
      <img className="Logo" src="images/BlockPartyLogo.png" alt="Block Party Logo"></img>
      <p className="Tagline">A new way to play and connect on the web and phone</p>
    </div>
    <button className="PlayButton" type="button" onClick={() => {history.push(routes.SIGN_IN)}}>Join the party</button>
    <p className="Legalese">By playing you agree to the<br/><a href="/">Terms of Use</a> and <a href="/">Privacy Policy</a></p>
  </div>

export default withRouter(LandingPage);