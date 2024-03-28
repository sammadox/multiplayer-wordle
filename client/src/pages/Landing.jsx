import { useState } from "react";
import { socket } from "../socket";
import Footer from "../components/Footer";
import useDelayUnmount from "../hooks/useDelayUnmount";

const getRoomName = () => {
    const generatorString = "abcdefghijklmnopqrstuvwxyz";
    let roomName = "";
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * generatorString.length);
        roomName += generatorString.charAt(randomIndex);
    }
    return roomName;
}

const appearAnimation = { animation: "appear 0.8s ease-in forwards" };
const vanishAnimation = { animation: "vanish 0.8s ease-out forwards" };

function Landing({ username, setUsername, room, setRoom }) {

    const [joiningRoom, setJoiningRoom] = useState('');
    const [isMounted, setIsMounted] = useState(true);
    const showButtons = useDelayUnmount(isMounted, 800);

    const handleUserInputChange = (event) => {
        setUsername(prevUser => prevUser = event.target.value);
    }

    const handleRoomInputChange = (event) => {
        setJoiningRoom(event.target.value);
    }

    const loadGame = (roomName) => {
        socket.connect();
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

    const handleLandingJoin = () => {
        setIsMounted(!isMounted);
    }

    return (
        <div className="main-landing">
            <div className="landing-container">
                <p>Wordle Battle</p>
                <input type="text" placeholder="Enter your name" onChange={handleUserInputChange} value={username} />
                <div className="action-container">
                    {
                        showButtons ? <div className="button-group" style={isMounted ? appearAnimation : vanishAnimation}>
                            <button className="btn" disabled={!username} onClick={handleCreateRoom}>Create Room</button>
                            <span>OR</span>
                            <button className="btn" disabled={!username} onClick={handleLandingJoin}>Join Room</button>
                        </div> :
                        <div className="join-room-group" style={isMounted ? {} : appearAnimation}>
                            <input type="text" placeholder="Enter room to join" onChange={handleRoomInputChange}/>
                            <button className="btn" disabled={!username || !joiningRoom} onClick={handleJoinRoom}>Join</button>
                        </div> 
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Landing;