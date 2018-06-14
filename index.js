const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccountDev = require('./serviceAccountDev.json');
const serviceAccountProd = require('./serviceAccountProd.json');

// Setup Express web app
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Send back React's index.html by default
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Start listening for connections on server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);

const serviceAccount = process.env.NODE_ENV === 'production' ? serviceAccountProd : serviceAccountDev;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://block-party-development.firebaseio.com"
});

// Initialize game duration
var gameDuration;
var gameDurationRef = admin.database().ref('gameDuration');
gameDurationRef.once('value').then((snapshot) => {
  if(!snapshot.val()) {
    gameDuration = 120000;
    gameDurationRef.set(gameDuration);
    console.log(`Set database state: gameDuration: ${gameDuration}`);
  }
  else {
    gameDuration = snapshot.val();
    console.log(`Read database state: gameDuration: ${gameDuration}`);
  }
  return snapshot;
}).catch(error => {
  console.log(error);
});

// Initialize next game time
var nextGameTime;
var nextGameTimeRef = admin.database().ref('nextGameTime');
nextGameTimeRef.once('value').then((snapshot) => {
  if(!snapshot.val()) {
    nextGameTime = new Date(Date.now() + gameDuration);
    nextGameTimeRef.set(nextGameTime.toJSON());
    console.log(`Set database state: nextGameTime: ${nextGameTime}`);
  }
  else {
    nextGameTime = new Date(snapshot.val());
    console.log(`Read database state: nextGameTime: ${nextGameTime}`);
  }
  return snapshot;
}).catch(error => {
  console.log(error);
});

// Start game timer update loop
setInterval(() => {
  if(Date.now() >= nextGameTime) {
    nextGameTime = new Date(Date.now() + gameDuration);
    admin.database().ref('nextGameTime').set(nextGameTime.toJSON());
    console.log(`Set database state: nextGameTime: ${nextGameTime}`);
  }
}, 1000);