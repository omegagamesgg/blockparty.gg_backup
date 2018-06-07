import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
  apiKey: "AIzaSyD5fiqWtwdnuqGeGM5RFodALEP-PFyCI9o",
  authDomain: "block-party-31d52.firebaseapp.com",
  databaseURL: "https://block-party-31d52.firebaseio.com",
  projectId: "block-party-31d52",
  storageBucket: "block-party-31d52.appspot.com",
  messagingSenderId: "235246870848"
};

const devConfig = {
  apiKey: "AIzaSyBFfRnRAGhc5d7Ul4WoDoXXSGKoc2d7Bx0",
  authDomain: "block-party-development.firebaseapp.com",
  databaseURL: "https://block-party-development.firebaseio.com",
  projectId: "block-party-development",
  storageBucket: "block-party-development.appspot.com",
  messagingSenderId: "742635923334"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if(!firebase.apps.lenght) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};