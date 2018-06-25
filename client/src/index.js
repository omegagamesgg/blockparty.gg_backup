import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

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