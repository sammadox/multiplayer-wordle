import { io } from "socket.io-client";

const URL = import.meta.env.VITE_WORDLEBATTLE_SERVER ?? "http://localhost:3000";

export const socket = io(URL, {
    autoConnect: false
});