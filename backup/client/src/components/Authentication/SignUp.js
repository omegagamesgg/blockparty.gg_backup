import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { authentication, database } from '../../firebase';
import * as routes from '../../constants/routes';
import './SignUp.css';

const SignUpPage = ({history}) =>
  <div className="SignUpPage">
    <p className="Instructions">Sign up</p>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  playerName: '',
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
      playerName,
      email,
      passwordOne,
    } = this.state;

    const { history } = this.props;

    authentication.createUser(email, passwordOne).then(user => {
      // Create a player in the database
      database.createPlayer(user.user.uid, playerName).then(() => {
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
      playerName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      playerName === '';

    return (
      <form className="SignUpInputForm" onSubmit={this.onSubmit}>
        <input className="InputField" value={playerName} onChange={event => this.setState(byPropKey('playerName', event.target.value))} type="text" placeholder="Player name" />
        <input className="InputField" value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email address" />
        <input className="InputField" value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password" placeholder="Password" />
        <input className="InputField" value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password" placeholder="Confirm password" />
        <button className="SubmitButton" type="submit" disabled={isInvalid}>Sign up</button>
        <p className="ErrorMessage">&nbsp;{error && error.message}</p>
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