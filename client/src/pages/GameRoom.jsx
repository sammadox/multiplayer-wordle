import { useEffect, useState } from "react";
import Game from "../components/Game";
import WaitForOpponent from "../components/WaitForOpponent";
import { socket } from "../socket";

function GameRoom({ username, opponent, room, setOpponent, word, setWord }) {

    const [currentPlayer, setCurrentPlayer] = useState();
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const togglePlayerTurn = () => {
        setIsPlayerTurn(prevIsPlayerTurn => !prevIsPlayerTurn);
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

        return () => {
            socket.off("new_opponent", handleNewOpponent);
            socket.off("first_player", handleCurrentPlayer);
            socket.off("room_word", handleGameWord);
        }
    }, []);

    return (
        <div>
            <h1>Game!!!</h1>
            <h5>Room: {room}</h5>
            <h5>user: {username}</h5>
            <h5>opponent: {opponent}</h5>
            <h5>turn: {currentPlayer}</h5>
            {opponent ? <Game room={room} isPlayerTurn={isPlayerTurn} setIsPlayerTurn={setIsPlayerTurn} setCurrentPlayer={setCurrentPlayer} opponent={opponent} username={username} word={word}/> : <WaitForOpponent />}
        </div>
    )
}

export default GameRoom;