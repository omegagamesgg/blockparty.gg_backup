import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import './PasswordForget.css';

const PasswordForgetPage = ({ history }) =>
  <div className="PasswordForgetPage">
    <p className="Instructions">Enter your email to change your password</p>
    <PasswordForgetForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = { email: '', error: null };

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;
    const { history } = this.props;
    auth.doPasswordRest(email).then(() => {
      this.setState(() => ({ ...INITIAL_STATE }));
      history.push(routes.SIGN_IN);
    }).catch(error => {
      this.setState(byPropKey('error', error));
    });
    event.preventDefault();
  }

  render() {
    const { email, error } = this.state;
    const isInvalid = email ===  '';

    return (
      <form className="PasswordForgetInputForm" onSubmit={this.onSubmit}>
        <input className="InputField" value={this.state.email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email address" />
        <button className="SubmitButton" disabled={isInvalid} type="submit">Reset my password</button>
        { error && <p className="ErrorMessage">{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p className="PasswordForgetLink">
    <Link to={routes.PASSWORD_FORGET}>Forgot your password?</Link>
  </p>

export default withRouter(PasswordForgetPage);
export { PasswordForgetForm, PasswordForgetLink };