import React from 'react';
import './LandingPage.css';

const LandingPage = () =>
  <div className="LandingPage">
    <img src="images/BlockPartyLogo.png" alt="Block Party"></img>
    <p className="LandingPage-tagline">A live social minigame network<br /><br />Coming soon to the web, iOS and Android</p>
    <div className="LandingPage-signUpForm" id="mc_embed_signup">
      <form action="https://blockparty.us18.list-manage.com/subscribe/post?u=063934cb27760e2adccfeab1b&amp;id=96738a899b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
	        <p className="LandingPage-callToAction">Sign up for email updates</p>
          <div className="mc-field-group">
            <input type="email" name="EMAIL" placeholder="Email address" className="required email LandingPage-inputField" id="mce-EMAIL" />
          </div>
	        <div id="mce-responses" className="clear">
		        <div className="response" id="mce-error-response" style={{display:'none'}}></div>
		        <div className="response" id="mce-success-response" style={{display:'none'}}></div>
	        </div>
          <div style={{position: 'absolute', left: -5000 + 'px'}} aria-hidden="true"><input type="text" name="b_063934cb27760e2adccfeab1b_96738a899b" tabIndex="-1" value="" /></div>
          <div className="clear"><input type="submit" value="Sign up" name="subscribe" id="mc-embedded-subscribe" className="LandingPage-submitButton button" /></div>
        </div>
      </form>
    </div>
  </div>

export default LandingPage;