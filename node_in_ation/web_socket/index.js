const express = require('express')
const socket = require('socket.io')

const app = express()
var server = app.listen(4000, function () {
  console.log('listening to request on ports 4000')
})

// Static files
app.use(express.static('public'))

// Socket setup
var io = socket(server)

io.on('connection', function(socket){
  console.log('made socket connection')
})