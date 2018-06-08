import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import './SignUp.css';

const SignUpPage = ({history}) =>
  <div className="SignUpPage">
    <p className="Instructions">Sign up</p>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const { 
      playername,
      email,
      passwordOne,
    } = this.state;

    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
      // Create a player in the Firebase database
      db.doCreatePlayer(authUser.user.uid, playername, email).then(() => {
        this.setState(() => ({...INITIAL_STATE}));
        history.push(routes.HOME);
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });
    }).catch(error => {
      this.setState(byPropKey('error', error));
    });
    event.preventDefault();
  }

  render() {
    const {
      playername,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      playername === '';

    return (
      <form className="SignUpInputForm" onSubmit={this.onSubmit}>
        <input className="InputField" value={playername} onChange={event => this.setState(byPropKey('playername', event.target.value))} type="text" placeholder="Player name" />
        <input className="InputField" value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email address" />
        <input className="InputField" value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password" placeholder="Password" />
        <input className="InputField" value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password" placeholder="Confirm password" />
        <button className="SubmitButton" type="submit" disabled={isInvalid}>Sign up</button>
        { error && <p className="ErrorMessage">{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p className="SignUpLink">
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign up</Link>
  </p>

export default withRouter(SignUpPage);
export { SignUpForm, SignUpLink };