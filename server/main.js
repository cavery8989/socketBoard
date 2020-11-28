require('dotenv').config()
var express = require('express');
var cors = require('cors')
var app = express(cors())
var bindEvents = require('./socket/bindEvents')

var http = require('http').createServer(app);

var PORT = process.env.PORT || 3001

var origin = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ORIGIN : "http://localhost:3000"

const io = require("socket.io")(http, {
    cors: {
      origin,
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('there was a connection')
    bindEvents(socket, io)
   
})

app.get('/pizza', (req, res) => {
  res.send('pie')
})  


http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});