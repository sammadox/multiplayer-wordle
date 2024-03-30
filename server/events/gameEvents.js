const {isValidWord} = require('../utils/words');
const { addUser, getRoomUserList, removeUser } = require("../utils/users");

const letterReceiveHandler = (io, socket) => {
    socket.on("letter_input", ({ letter, room }) => {
        io.to(room).emit("letter_input", { letter, room });
    });
}

const deleteReceiveHandler = (io, socket) => {
    socket.on("delete_input", ({ room }) => {
        io.to(room).emit("delete_input");
    });
}

const submitReceiveHandler = (io, socket) => {
    socket.on("submit_input", ({ room, currentWord }) => {
        io.to(room).emit("submit_input", { isValidWord: isValidWord(currentWord) });
    });
}

const gameOverHandler = (io, socket) => {
    socket.on("game_over", ({ winner, room }) => {
        io.to(room).emit("game_over", { winner });
    });
}

module.exports = {
    letterReceiveHandler,
    deleteReceiveHandler,
    submitReceiveHandler,
    gameOverHandler
}