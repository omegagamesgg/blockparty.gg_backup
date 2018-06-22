const express = require('express');
const path = require('path');
const http = require('http');
const firebaseManager = require('./firebaseManager');
const gameManager = require('./gameManager');
const playerManager = require('./playerManager');
const socketManager = require('./socketManager');

var gamePlayers = [];

// Setup Express web app
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/games/now', (request, response) => {
  response.send(gameManager.gameState);
});

// Send back React's index.html by default
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Setup HTTP server
const port = process.env.PORT || 5000;
const httpServer = http.Server(app);
httpServer.listen(port);
console.log(`HTTP server listening on ${port}`);

// Initialize Firebase administration
firebaseManager.initialize();

// Initialize game state
gameManager.initialize();

// Initialize player state
playerManager.initialize();

// Initialize game socket server
socketManager.initialize(httpServer);