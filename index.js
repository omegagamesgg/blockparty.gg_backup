const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Send back React's index.html by default
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Server listening on ${port}`);

io.on('connect', function(socket) {
  console.log(`connect: socket.id=${socket.id}`);

  socket.on('disconnect', function(reason) {
    console.log(`disconnect: socket.id=${socket.id}, reason=${reason}`);
  });
});