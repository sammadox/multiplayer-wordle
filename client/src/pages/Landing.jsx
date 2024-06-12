import { useState } from "react";
import Footer from "../components/Footer";
import useDelayUnmount from "../hooks/useDelayUnmount";
import { useAppContext } from "../hooks/useAppContext";

const appearAnimation = { animation: "appear 0.5s ease-in forwards" };
const vanishAnimation = { animation: "vanish 0.5s ease-out forwards" };

function Landing() {

    const {
        setRoom, username, setUsername,
        getRoomName, startGame
    } = useAppContext();

    const [joiningRoom, setJoiningRoom] = useState('');
    const [isMounted, setIsMounted] = useState(true);
    const showButtons = useDelayUnmount(isMounted, 500);

    const handleUserInputChange = (event) => {
        setUsername(event.target.value);
    }

    const handleRoomInputChange = (event) => {
        setJoiningRoom(event.target.value);
    }

    const handleCreateRoom = () => {
        const roomName = getRoomName();
        setRoom(roomName);
        startGame(roomName);
    }

    const handleJoinRoom = () => {
        setRoom(joiningRoom);
        startGame(joiningRoom);
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