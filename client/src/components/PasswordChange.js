import React, { Component } from 'react';
import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({ [propertyName]: value });
const INITIAL_STATE = { passwordOne: '', passwordTwo: '', error: null };

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;
    auth.doPasswordUpdate(passwordOne).then(() => {
      this.setState(() => ({ ...INITIAL_STATE }));
    }).catch(error => {
      this.setState(byPropKey('error', error));
    });
    event.preventDefault();
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form className="PasswordChangeForm" onSubmit={this.onSubmit}>
        <input className="InputField" value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password" placeholder="New password" />
        <input className="InputField" value={passwordTwo} onChange={event => this.setState(byPropKey('passwordtwo', event.target.value))} type="password" placeholder="Confirm new password" />
        <button className="SubmitButton" value={isInvalid} type="submit">Reset my password</button>
        { error && <p className="ErrorMessage">{error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;