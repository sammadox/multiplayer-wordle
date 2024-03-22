const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const {
    letterReceiveHandler,
    deleteReceiveHandler,
    submitReceiveHandler
} = require('./events/gameEvents');

const {
    roomJoinHandler,
    userDisconnectedHandler
} = require('./events/userEvents');

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
    console.log("user joined");

    // On join room
    roomJoinHandler(socket, io);

    // On receiving a letter from game
    letterReceiveHandler(socket);
    // On receiving a delete from game
    deleteReceiveHandler(socket);
    // On receiving a submit from game
    submitReceiveHandler(socket);

    //On disconnecting
    userDisconnectedHandler(socket);
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));