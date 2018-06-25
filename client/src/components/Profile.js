import React from 'react';
import AuthenticatedUserContext from './Authentication/AuthenticatedUserContext';
import { PasswordForgetForm } from './Authentication/PasswordForget';
import PasswordChangeForm from './Authentication/PasswordChange';
import withAuthorization from './Authentication/withAuthorization';

const ProfilePage = () =>
  <AuthenticatedUserContext.Consumer>
    { context => 
      <div>
        <p>{context.currentPlayer.name}</p>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthenticatedUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProfilePage);