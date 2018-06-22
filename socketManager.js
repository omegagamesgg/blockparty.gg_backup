const socketIO = require('socket.io');
const playerManager = require('./playerManager');

var sockets = [];

var logSocketState = (socketId) => {
  console.log(`sockets[${socketId}] = { socketId: ${sockets[socketId].socketId}, playerId: ${sockets[socketId].playerId} }`);
};

var initialize = (httpServer) => {
  const socketIOServer = socketIO(httpServer, { origins: '*:*' });
  socketIOServer.on('connection', function(socket) {
    console.log('connecting socket ' + socket.id);
    sockets[socket.id] = {
      socketId: socket.id,
      playerId: '',
    }
    logSocketState(socket.id);

    socket.on('set player socket', function(playerId) {
      setSocketPlayer(socket.id, playerId);
      playerManager.setPlayerSocket(playerId, socket.id);
    });

    socket.on('join game', function(playerId) {
      //gamePlayers[socket.id].playerId = playerId;
      //admin.database().ref(`players/${playerId}`).once('value', snapshot => {
      //  gamePlayers[socket.id].name = snapshot.val().name;
      //  console.log('join game: ' + gamePlayers[socket.id].name + ' (' + gamePlayers[socket.id].playerId + ')');
      //});
    });

    socket.on('player click', function() {
      //console.log(`player click: ${socket.id}`);
      //gamePlayers[socket.id].score++;
      //socket.emit('player score update', { score: gamePlayers[socket.id].score });
    });

    socket.on('disconnect', function() {
      console.log(`disconnecting socket ${socket.id}`);
      if(sockets[socket.id].playerId !== null) {
        playerManager.setPlayerSocket(sockets[socket.id].playerId, null);
      }
      delete sockets[socket.id];
    });
  });
};

var setSocketPlayer = (socketId, playerId) => {
  sockets[socketId].playerId = playerId;
  logSocketState(socketId);
};
exports.initialize = initialize;