import { useEffect, useState } from "react";
import Game from "../components/Game";
import WaitForOpponent from "../components/WaitForOpponent";
import { socket } from "../socket";
import GameDetails from "../components/GameDetails";
import { toast } from 'react-toastify';

function GameRoom({ username, opponent, room, setOpponent, word, setWord, setRoom }) {

    const [currentPlayer, setCurrentPlayer] = useState();
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const toastOptions = {
        position: "bottom-center"
    };

    const toggleCurrentPlayer = () => {
        if (currentPlayer === username) {
            setCurrentPlayer(opponent);
        } else {
            setCurrentPlayer(username);
        }
    }

    useEffect(() => {

        console.log("socket", socket.connected, socket);

        const handleNewOpponent = (data) => {
            console.log("Data", data);
            setOpponent(data.username);
        }

        socket.on("new_opponent", handleNewOpponent);

        const handleCurrentPlayer = ({ user }) => {
            console.log("Turn", user);
            setCurrentPlayer(user.username);
            if (user.username === username) {
                setIsPlayerTurn(prevIsPlayerTurn => true);
            }
        }

        socket.on("first_player", handleCurrentPlayer);

        const handleGameWord = ({ word }) => {
            setWord(word);
        }

        socket.on("room_word", handleGameWord);

        const handleRoomFull = () => {
            toast.error("Room full! Try another or create one!", toastOptions);
            setRoom("");
        }

        socket.on('room_full', handleRoomFull);

        return () => {
            socket.off("new_opponent", handleNewOpponent);
            socket.off("first_player", handleCurrentPlayer);
            socket.off("room_word", handleGameWord);
            socket.off('room_full', handleRoomFull);
        }
    }, []);

    return (
        <div className="game-room">
            <GameDetails 
                room={room} username={username}
                opponent={opponent} currentPlayer={currentPlayer}
            />
            {opponent ? <Game room={room} 
                isPlayerTurn={isPlayerTurn} 
                setIsPlayerTurn={setIsPlayerTurn} 
                setCurrentPlayer={setCurrentPlayer}
                opponent={opponent} username={username} 
                word={word} toggleCurrentPlayer={toggleCurrentPlayer}
                /> 
                : <WaitForOpponent />}
        </div>
    )
}

export default GameRoom;