import { authentication } from './firebase';

// Sign up a new user by email address and password
export const createUser = (email, password) =>
  authentication.createUserWithEmailAndPassword(email, password);

// Sign a user in by email address and password
export const signInUser = (email, password) =>
  authentication.signInWithEmailAndPassword(email, password);

// Sign the currently signed in user out
export const signOutUser = () =>
  authentication.signOut();

// Set an observer on the authentication state
export const onAuthenticationStateChanged = (handler) =>
  authentication.onAuthStateChanged(handler);
  
// Get the currently signed in user
export const getSignedInUser = () =>
  authentication.currentUser;

// Send a password reset email to a user by email address
export const resetUserPassword = (email) =>
  authentication.sendPasswordResetEmail(email);

// Update the currently signed in user's password
export const updateUserPassword = (password) =>
  authentication.currentUser.updatePassword(password);