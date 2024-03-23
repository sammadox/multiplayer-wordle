import { useState } from "react";
import { socket } from "../socket";
import Footer from "../components/Footer";

const getRoomName = () => {
    const generatorString = "abcdefghijklmnopqrstuvwxyz";
    let roomName = "";
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * generatorString.length);
        roomName += generatorString.charAt(randomIndex);
    }
    return roomName;
}

function Landing({ username, setUsername, room, setRoom }) {

    const [joiningRoom, setJoiningRoom] = useState('');

    const handleUserInputChange = (event) => {
        setUsername(prevUser => prevUser = event.target.value);
    }

    const handleRoomInputChange = (event) => {
        setJoiningRoom(event.target.value);
    }

    const loadGame = (roomName) => {
        socket.connect();
        // console.log("User", username, room);
        socket.emit("join_room", { username, room: roomName });
    }

    const handleCreateRoom = () => {
        const roomName = getRoomName();
        setRoom(roomName);
        loadGame(roomName);
    }

    const handleJoinRoom = () => {
        setRoom(joiningRoom);
        loadGame(joiningRoom);
    }

    return (
        <div className="main-landing">
            <div className="landing-container">
                <p>Wordle Battle</p>
                <input type="text" placeholder="Enter your name" onChange={handleUserInputChange} />
                <button id="create-btn" disabled={!username || (username && joiningRoom)} onClick={handleCreateRoom}>Create Room</button>
                <input type="text" placeholder="Enter room to join" onChange={handleRoomInputChange} />
                <button disabled={!username || !joiningRoom} onClick={handleJoinRoom}>Join Room</button>
            </div>
            <Footer />
        </div>
    );
}

export default Landing;