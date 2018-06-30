const express = require('express');
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

const app = express();

// initialize firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://block-party-31d52.firebaseio.com"
});

const pregameDuration = 3000;
const gameDuration = 10000;
const postgameDuration = 10000;
var clock = {
  active: false,
  startTime: null,
  endTime: null,
}

// initialize game state
setTimeout(() => { startGame(); }, pregameDuration);

var startGame = () => {
  console.log('starting game');
  clock.active = true;
  clock.startTime = new Date(Date.now());
  clock.endTime = new Date(Date.now() + gameDuration);
  firebaseAdmin.database().ref(`games/clickparty/clock`).update({ active: clock.active, startTime: clock.startTime, endTime: clock.endTime });
  firebaseAdmin.database().ref(`games/clickparty/scores`).set(null);
  firebaseAdmin.database().ref(`games/clickparty/results`).set(null);
  setTimeout(() => { endGame(); }, gameDuration);
}

var endGame = () => {
  console.log('ending game');
  clock.active = false;
  clock.startTime = new Date(Date.now() + postgameDuration);
  clock.endTime = new Date(Date.now());
  firebaseAdmin.database().ref(`games/clickparty/clock`).update({ active: clock.active, startTime: clock.startTime, endTime: clock.endTime });

  // Create game results
  firebaseAdmin.database().ref(`games/clickparty/scores`).orderByChild('score').once('value', snapshot => {
    let result = [];
    snapshot.forEach(score => {
      result.splice(0, 0, { playerId: score.val().playerId, score: score.val().score });
    });
    firebaseAdmin.database().ref(`games/clickparty/results`).set(result);
  });

  setTimeout(() => { startGame(); }, postgameDuration);
}