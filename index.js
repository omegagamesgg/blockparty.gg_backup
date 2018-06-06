const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;

var players = [];
var nextPlayerId = 1;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Send back React's index.html by default
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(port);
console.log(`Server listening on ${port}`);

io.on('connect', function(socket) {
  console.log(`connect: socket.id=${socket.id}`);
  players[socket.id] = "";

  socket.on('rename player', function(data) {
    var oldName = players[socket.id];
    if(players.filter(name => name === data.Name).length > 0) {
      console.log(`player renamed: { result: fail, oldName: ${oldName}, newName: ${newName} }`);
      socket.emit('player renamed', {
        result: 'fail',
        oldName: oldName,
        newName: oldName
      });
    }
    else {
      players[socket.id] = data.Name;
      console.log(`player renamed: { result: success, oldName: ${oldName}, newName: ${players[socket.id]} }`);
      io.emit('player renamed', {
        result: 'success',
        oldName: oldName,
        newName: players[socket.id]
      });
    }
  });

  socket.on('disconnect', function(reason) {
    console.log(`disconnect: socket.id=${socket.id}, reason=${reason}`);
  });
});