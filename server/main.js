require('dotenv').config()
var express = require('express');
var cors = require('cors')
var app = express(cors())
var bindEvents = require('./socket/bindEvents')

var http = require('http').createServer(app);

var origin = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ORIGIN : "http://localhost:3001"

const io = require("socket.io")(http, {
    cors: {
      origin,
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('there was a connection')
    bindEvents(socket)
   
})

app.get('/pizza', (req, res) => {
  res.send('pie')
})  


http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});