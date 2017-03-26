const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 8000

app.use('/node_modules', express.static('node_modules'))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))


const history = ['Room Opened']
io.on('connection', socket => {
  socket.emit('history', history.join('|'))

  socket.on('chat message', msg => {
    history.push(msg)
    io.emit('chat message', msg)
  })
})

server.listen(port, () => console.log('listening on *:' + port))
