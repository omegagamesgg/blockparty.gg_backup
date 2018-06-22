const admin = require('firebase-admin');

var players = [];

var logPlayerState = (playerId) => {
  console.log(`players[${playerId}] = { id: ${players[playerId].id}, name: ${players[playerId].name}, socketId: ${players[playerId].socketId} }`);
};

var initialize = () => {
  console.log('initializing players');
  admin.database().ref('players').on('value', snapshot => {
    snapshot.forEach(player => {
      players[player.key] = {
        id: player.key,
        name: player.val().name,
        socketId: null,
      }
      logPlayerState(player.key);
    });
  });
};

var setPlayerSocket = (playerId, socketId) => {
  if(players[playerId]) {
    players[playerId].socketId = socketId;
    logPlayerState(playerId);
  }
};

exports.initialize = initialize;
exports.setPlayerSocket = setPlayerSocket;