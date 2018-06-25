import React from 'react';
import { authentication } from '../../firebase';

const SignOutButton = () =>
  <button type="button" onClick={authentication.signOutUser}>Sign out</button>

export default SignOutButton;