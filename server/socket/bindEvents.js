const bindEvents = (socket, io) => {

    socket.on('createRoom', (room) => {
        console.log("Creating ", room)
        socket.join(room)
      
        socket.emit('confirmGameCreated', room)
    })

    socket.on('joinGame', (room) => {
        console.log('handleJoin')
        const rooms = io.sockets.adapter.rooms
        if(rooms.has(room)) {
            console.log(rooms[room])
            socket.join(room)
            socket.broadcast.emit('playerJoined')
            socket.emit('confirmGameJoined', room)
        } else {
            socket.emit('gameNotFound', room)
        }
    })

    socket.on('drawing', (data) => { 
        const room = getRoom(socket)
        socket.to(room).emit('drawing', data)
    })

    socket.on('clearCanvas', () => {
        socket.to(getRoom(socket)).emit('clearCanvas')
    })

    socket.on('leaveGame', () => {
        console.log(socket.rooms)
        const room = getRoom(socket)
        socket.to(room).emit('hostLeft')
        socket.leave(room)
    })

    return socket
}
const getRoom = (socket) => [...socket.rooms].filter(n => n !== socket.id)[0]
module.exports = bindEvents