const bindEvents = (socket) => {

    socket.on('joinRoom', (data) => {
        console.log("Joining ", data)
        socket.join(data)
    })

    socket.on('drawing', (data) => { 
        const room = [...socket.rooms].filter(n => n !== socket.id)[0]
        socket.to(room).emit('drawing', data)       
    })

    return socket
}

module.exports = bindEvents