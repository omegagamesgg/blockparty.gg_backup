import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import './SignIn.css';

const SignInPage = ({ history }) =>
  <div className="SignInPage">
    <p className="Instructions">Sign in to play</p>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth.doSignInWithEmailAndPassword(email, password).then(() => {
      this.setState(() => ({ ...INITIAL_STATE }));
      history.push(routes.HOME);
    }).catch(error => {
      this.setState(byPropKey('error', error));
    });

    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form className="InputForm" onSubmit={this.onSubmit}>
        <input className="InputField" value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email address" />
        <input className="InputField" value={password} onChange={event => this.setState(byPropKey('password', event.target.value))} type="password" placeholder="Password" />
        <button className="SubmitButton" disabled={isInvalid} type="submit">Sign in</button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);
export { SignInForm };