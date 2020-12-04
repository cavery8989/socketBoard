const bindEvents = (socket, io) => {

    socket.on('createRoom', (room) => {
        console.log("Creating ", room)
        socket.join(room)

        socket.emit('confirmGameCreated', room)
    })

    socket.on('joinGame', (room) => {
        console.log('handleJoin')
        const rooms = io.sockets.adapter.rooms
        if (rooms.has(room)) {
            socket.join(room)
            console.log('player joined')
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

    socket.on('startGameGuest', (data) => {
        socket.to(getRoom(socket)).emit('startGameGuest',data)
    })

    socket.on('hostTurnOver', (data) => {
        socket.to(getRoom(socket)).emit('hostTurnOver', data)
    })

    socket.on('guestTurnOver', () => {
        socket.to(getRoom(socket)).emit('guestTurnOver')
    })

    socket.on('gameOver', () => {
        socket.to(getRoom(socket)).emit('gameOver')
    })

    socket.on('guestTurnOver', () => {
        socket.to(getRoom(socket)).emit('guestTurnOver')
    })

    socket.on('updateGuestTurns', (data) => {
        socket.to(getRoom(socket)).emit('updateGuestTurns', data)
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