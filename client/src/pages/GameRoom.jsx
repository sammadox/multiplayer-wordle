import { useEffect } from "react";
import Game from "../components/Game";
import WaitForOpponent from "../components/WaitForOpponent";
import { socket } from "../socket";
import GameDetails from "../components/GameDetails";
import { useAppContext } from "../hooks/useAppContext";

function GameRoom() {

    const {
        opponent, handleNewOpponent, handleCurrentPlayer,
        handleGameWord, handleRoomFull
    } = useAppContext();

    useEffect(() => {

        socket.on("new_opponent", handleNewOpponent);
        socket.on("first_player", handleCurrentPlayer);
        socket.on("room_word", handleGameWord);
        socket.on('room_full', handleRoomFull);

        return () => {
            socket.off("new_opponent", handleNewOpponent);
            socket.off("first_player", handleCurrentPlayer);
            socket.off("room_word", handleGameWord);
            socket.off('room_full', handleRoomFull);
        }
        
    }, []);

    return (
        <div className="game-room-container">
            <div className="game-room">
                <GameDetails />
                {
                    opponent ? <Game /> : <WaitForOpponent />
                }
            </div>
        </div>
    )
}

export default GameRoom;