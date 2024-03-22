const letterReceiveHandler = (socket) => {
    socket.on("letter_input", ({ letter, room }) => {
        socket.broadcast.to(room).emit("letter_input", { letter, room });
    });
}

const deleteReceiveHandler = (socket) => {
    socket.on("delete_input", ({ room }) => {
        socket.broadcast.to(room).emit("delete_input");
    });
}

const submitReceiveHandler = (socket) => {
    socket.on("submit_input", ({ room }) => {
        socket.broadcast.to(room).emit("submit_input");
    });
}

const gameOverHandler = (socket) => {
    socket.on("game_over", ({ winner, room }) => {
        socket.broadcast.to(room).emit("game_over", { winner });
    });
}

module.exports = {
    letterReceiveHandler,
    deleteReceiveHandler,
    submitReceiveHandler,
    gameOverHandler
}