const { addUser, getRoomUserList, removeUser } = require("../utils/users");
const { getRandomWord } = require('../utils/words');

const broadcastToOthersInRoom = (socket, room, username) => {
    socket.broadcast.to(room).emit("new_opponent", { username: username });
}

const emitToSelf = (socket, username) => {
    socket.emit("new_opponent", { username });
}

const emitToAllInRoom = (io, room, event, args) => {
    io.to(room).emit(event, args);
}

const roomJoinHandler = (socket, io) => {
  socket.on("join_room", ({ username, room }) => {
    let users = getRoomUserList(room);
    console.log("users size", users.length);
    if (users.length === 2) {
        console.log("Here");
        socket.emit("room_full");
    } else {
        socket.join(room);
        addUser(socket.id, username, room);
        users = getRoomUserList(room);
        console.log("users", users);
        if (users.length === 2) {
            broadcastToOthersInRoom(socket, room, username);
            emitToSelf(socket, users[0].username);
            emitToAllInRoom(io, room, "first_player", { user: users[Math.floor(Math.random()*2)] });
            emitToAllInRoom(io, room, "room_word", { word: getRandomWord()});
        }
    }
  });
};

const userDisconnectedHandler = (socket) => {
    socket.on("disconnect", () => {
        let removedUser = removeUser(socket.id);
        console.log("user left:", removedUser);
    });
}

module.exports = {
  roomJoinHandler,
  userDisconnectedHandler
};
