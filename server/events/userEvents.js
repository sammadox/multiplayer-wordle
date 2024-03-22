const { addUser, getRoomUserList, removeUser } = require("../utils/users");

const broadcastToOthersInRoom = (socket, room, username) => {
    socket.broadcast.to(room).emit("new_opponent", { username: username });
}

const emitToSelf = (socket, username) => {
    socket.emit("new_opponent", { username });
}

const emitToAllInRoom = (io, room, user) => {
    io.to(room).emit("first_player", { user });
}

const roomJoinHandler = (socket, io) => {
  socket.on("join_room", ({ username, room }) => {
    socket.join(room);
    addUser(socket.id, username, room);
    const users = getRoomUserList(room);
    console.log("users", users);
    if (users.length === 2) {
        broadcastToOthersInRoom(socket, room, username);
        emitToSelf(socket, users[0].username);
        emitToAllInRoom(io, room, users[Math.floor(Math.random()*2)]);
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
