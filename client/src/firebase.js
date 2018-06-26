import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD5fiqWtwdnuqGeGM5RFodALEP-PFyCI9o",
  authDomain: "block-party-31d52.firebaseapp.com",
  databaseURL: "https://block-party-31d52.firebaseio.com",
  projectId: "block-party-31d52",
  storageBucket: "block-party-31d52.appspot.com",
  messagingSenderId: "235246870848"
};

firebase.initializeApp(config);

var authentication = firebase.auth();
var database = firebase.database();

export {
  authentication,
  database
}