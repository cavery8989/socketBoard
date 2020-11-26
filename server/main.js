var express = require('express');
var cors = require('cors')
var app = express(cors())
var bindEvents = require('./socket/bindEvents')

var http = require('http').createServer(app);


const io = require("socket.io")(http, {
    cors: {
      origin: ["http://localhost:3001", "https://cavery8989.github.io/"],
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('there was a connection')
    bindEvents(socket)
   
})


http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});