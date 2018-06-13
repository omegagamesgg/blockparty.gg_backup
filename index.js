const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 1337;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Send back React's index.html by default
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);
console.log(`Server listening on ${port}`);