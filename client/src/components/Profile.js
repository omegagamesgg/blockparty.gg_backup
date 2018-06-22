import React from 'react';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const ProfilePage = () =>
  <AuthenticatedUserContext.Consumer>
    { context => 
      <div>
        <p>{context.currentPlayer.playername}</p>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthenticatedUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProfilePage);