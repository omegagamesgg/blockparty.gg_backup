const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

// Setup game timer
const gameDuration = 120000;
var nextGameTime = Date.now() + gameDuration;
setInterval(function() {
  if(Date.now() >= nextGameTime) {
    nextGameTime = Date.now() + gameDuration;
    console.log(`Setting state: nextGameTime: ${new Date(nextGameTime).toLocaleString()}`);
  }
}, 1000);

app.get('/games/now', (request, response) => {
  response.json({ nextGameTime: new Date(nextGameTime).toLocaleString() });
});

exports.app = functions.https.onRequest(app);
