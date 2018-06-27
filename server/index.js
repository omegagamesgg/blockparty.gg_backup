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
const gameDuration = 60000;
const postgameDuration = 15000;
var gameState = {
  active: false,
  startTime: null,
  endTime: null,
}

// initialize game state
setTimeout(() => { startGame(); }, pregameDuration);

var startGame = () => {
  console.log('starting game');
  gameState.active = true;
  gameState.startTime = new Date(Date.now());
  gameState.endTime = new Date(Date.now() + gameDuration);
  firebaseAdmin.database().ref(`games/clickparty/clock`).update({ active: gameState.active, startTime: gameState.startTime, endTime: gameState.endTime });
  firebaseAdmin.database().ref(`games/clickparty/scores`).once('value', snapshot => {
    snapshot.forEach(score => firebaseAdmin.database().ref(`games/clickparty/scores/${score.key}`).update({ score: 0 }));
  });
  setTimeout(() => { endGame(); }, gameDuration);
}

var endGame = () => {
  console.log('ending game');
  gameState.active = false;
  gameState.startTime = new Date(Date.now() + postgameDuration);
  gameState.endTime = new Date(Date.now());
  firebaseAdmin.database().ref(`games/clickparty/clock`).update({ active: gameState.active, startTime: gameState.startTime, endTime: gameState.endTime });
  setTimeout(() => { startGame(); }, postgameDuration);
}