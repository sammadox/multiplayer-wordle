const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const { addUser, getUser, removeUser, getRoomUserList } = require('./utils/users');

// const getRoomName = () => {
//     const generatorString = "abcdefghijklmnopqrstuvwxyz";
//     let roomName= "";
//     for (let i = 0; i < 6; i++) {
//         let randomIndex = Math.floor(Math.random() * generatorString.length);
//         roomName += generatorString.charAt(randomIndex);
//     }
//     return roomName;
// }

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

const PORT = process.env.PORT || 3000;

app.use(cors());

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ status: "tired" });
});

let activeUsers = [];
let roomId = "";


io.on("connection", (socket) => {
    console.log("User joined");

    socket.on("join_room", ({username, room}) => {
        socket.join(room);
        console.log(`${username} joined ${room}`);
        addUser(socket.id, username, room);
        const userList = getRoomUserList(room);
        console.log(userList);
        if (userList.length === 2) {
            socket.broadcast.to(room).emit("new_opponent", {username});
            socket.emit("new_opponent", { username: userList[0].username});
            io.to(room).emit("first_player", {user: userList[Math.floor(Math.random() * 2)]});
        }
        // io.to(room).emit("new_message", `${username} joined ${room}`);
        // socket.broadcast.to(room).emit("new_opponent", {username});
    });

    socket.on("letter_input", ({ letter, room }) => {
        socket.broadcast.to(room).emit("letter_input", { letter, room });
    });

    socket.on("delete_input", ({ room }) => {
        socket.broadcast.to(room).emit("delete_input");
    });

    socket.on("submit_input", ({ room }) => {
        socket.broadcast.to(room).emit("submit_input");
    });

    // socket.on("new_message", (msg) => {
    //     io.to(roomId).emit("new_message", msg);
    // });

    socket.on("disconnect", () => {
        // activeUsers.delete(socket.id);
        let removedUser = removeUser(socket.id);
        console.log("left user:", removedUser);
        // io.to(roomId).emit("user_disconnected", socket.id);
        console.log("user left");
    });
    
});


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

/*

// join room
    socket.on("join_room", ({username, room}) => {
        const user = addUser(socket.id, username, room);
        socket.join(user.room);

        // send users in room to frontend
        io.to(user.room).emit("room_users", {
            room: user.room,
            users: getRoomUserList(user.room)
        });

        io.to(user.room).emit("send_msg", {
            message: `${user.username} has joined ${user.room}`
        });
    });

    console.log("User connected...");

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        // send users in room to frontend
        io.to(user.room).emit("room_users", {
            room: user.room,
            users: getRoomUserList(user.room)
        });
    })

*/