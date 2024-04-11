import { useEffect } from "react";
import Game from "../components/Game";
import WaitForOpponent from "../components/WaitForOpponent";
import { socket } from "../socket";
import GameDetails from "../components/GameDetails";
import { useAppContext } from "../hooks/useAppContext";
import ChatButton from "../components/ChatButton";
import ChatWindow from "../components/ChatWindow";

function GameRoom() {

    const {
        opponent, handleNewOpponent, handleCurrentPlayer,
        handleGameWord, handleRoomFull, showChat
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
            {
                showChat ? <ChatWindow /> : <ChatButton />
            }
        </div>
    )
}

export default GameRoom;