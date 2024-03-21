import { io } from "socket.io-client";

const URL = "http://localhost:3000"; //process.env.WORDLE_SERVER ??

export const socket = io(URL, {
    autoConnect: false
});