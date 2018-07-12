module.exports = function(io) {
    // collaboration sessions
    const collaborations = {};
    const socketIdToSessionId = {};

    io.on('connection', (socket) => {
        // console.log(socket);
        // const message = socket.handshake.query['message'];
        // console.log(message);
        // io.to(socket.id).emit('message', 'hey from server');
        const sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        if (!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                participants: []
            };
        }
        collaborations[sessionId]['participants'].push(socket.id);

        socket.on('change', delta => {
            console.log('change' + socketIdToSessionId[socket.id] + ' ' + delta);
            const sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                const participants = collaborations[sessionId]['participants'];
                for(let participant of participants) {
                    if (socket.id != participant) {
                        io.to(participant).emit('change', delta);
                    }
                }
            } else {
                console.warn('WARNING');
            }
        })
    })
}