const express = require('express')
const socket = require('socket.io')

const app = express()
const server = app.listen(4000, ()=>{
  console.log('listening to request on ports 4000')
})

// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server)

io.on('connection', (socket)=>{
  console.log('made socket connection', socket.id)
})