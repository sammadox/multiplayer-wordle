import { useEffect, useState } from "react";
import WordGuess from "./WordGuess";
import Keyboard from "./Keyboard";
import { socket } from "../socket";
import Modal from "./Modal";
import Delayed from "./Delayed";

function Game({room, isPlayerTurn, setIsPlayerTurn, setCurrentPlayer, opponent, username, word}) {

    const [currentWord, setCurrentWord] = useState("");
    const [currentRow, setCurrentRow] = useState(0);
    const [guessList, setGuessList] = useState([]);
    const [guessedExactLetters, setGuessedExactLetters] = useState([]);
    const [guessedNotExactLetters, setGuessedNotExactLetters] = useState([]);
    const [guessedWrongLetters, setGuessedWrongLetters] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");
    console.log("The word is: ", word);

    useEffect(() => {

        const handleLetterInputFromServer = ({ letter }) => {
            handleLetterClick(letter, true);
        }

        const handleDeleteFromServer = () => {
            console.log("Delete from server");
            handleDeleteClick(true);
        }

        const handleSubmitFromServer = () => {
            handleEnterClick(true);
        }

        const handleGameOverFromServer = ({ winner }) => {
            setIsGameOver(true);
            setIsWinner(false);
            setWinner(winner);
        }

        socket.on("letter_input", handleLetterInputFromServer);
        socket.on("delete_input", handleDeleteFromServer);
        socket.on("submit_input", handleSubmitFromServer);
        socket.on("game_over", handleGameOverFromServer);

        return () => {
            socket.off("letter_input", handleLetterInputFromServer);
            socket.off("delete_input", handleDeleteFromServer);
            socket.off("submit_input", handleSubmitFromServer);
            socket.off("game_over", handleGameOverFromServer);
        }

    }, [currentWord]);

    const getBackgroundColorClassName = (key) => {
        if (guessedExactLetters.includes(key)) {
            return "word-letter-correct-place";
        } else if (guessedNotExactLetters.includes(key)) {
            return "word-letter-wrong-place";
        } else if (guessedWrongLetters.includes(key)) {
            return "word-letter-not-present";
        }
        return "";
    }

    const submitGuess = (isFromServer) => {
        currentWord.split('').map((letter, index) => {
            if (word[index] === letter) {
                if (!guessedExactLetters.includes(letter)) {
                    setGuessedExactLetters(prevGuessedExactLetters => [...prevGuessedExactLetters, letter]);
                }
            } else if (word.includes(letter)) {
                if (!guessedNotExactLetters.includes(letter)) {
                    setGuessedNotExactLetters(prevGuessedNotExactLetters => [...prevGuessedNotExactLetters, letter]);
                }
            } else {
                if (!guessedWrongLetters.includes(letter)) {
                    setGuessedWrongLetters(prevGuessedWrongetters => [...prevGuessedWrongetters, letter]);
                }
            }
        });
        if (currentWord === word && !isFromServer) {
            handleGameOver(true);
        } else if (currentRow === 4) {
            handleGameOver(false);
        }
        setGuessList(prevGuestList => [...prevGuestList, currentWord]);
        setCurrentRow(prevCurrentRow => prevCurrentRow + 1);
        setCurrentWord("");

        if (!isFromServer) {
            setIsPlayerTurn(false);
            setCurrentPlayer(opponent);
        } else {
            setIsPlayerTurn(true);
            setCurrentPlayer(username);
        }
    }

    const handleLetterClick = (key, isFromServer) => {
        console.log("In Letter", isPlayerTurn, isFromServer, key, currentWord);
        if (!isPlayerTurn && !isFromServer) return;
        if (currentWord.length < 5) {
            setCurrentWord(prevCurrentWord => prevCurrentWord + key);
        }
        if (!isFromServer) {
            sendLetterToServer(key);
        }
        // console.log(`${key} pressed!`)
    }

    const handleDeleteClick = (isFromServer) => {
        console.log("In Delete", isPlayerTurn, isFromServer, currentWord);
        // false true
        if (!isPlayerTurn && !isFromServer) return;
        if (currentWord.length > 0) {
            setCurrentWord(prevCurrentWord => prevCurrentWord.slice(0,-1));
        }
        if (!isFromServer) {
            sendDeleteToServer();
        }
        // console.log(`Delete pressed!`)
    }

    const handleEnterClick = (isFromServer) => {
        console.log('Here', currentWord, currentWord.length, isPlayerTurn, isFromServer);
        if (!isPlayerTurn && !isFromServer) return;
        if (currentWord.length === 5) {
            console.log(`Word submitted: ${currentWord}`);
            submitGuess(isFromServer);
        }
        if (!isFromServer) {
            sendSubmitToServer();
        }
    }

    const handleKeyUp = (e) => {
        e.preventDefault();
        if (!isPlayerTurn) return;
        // console.log("Enter", e.key);
        if (e.code === `Key${e.key.toUpperCase()}`) {
            // console.log("here", e.key.toUpperCase());
            handleLetterClick(e.key.toUpperCase(), false);
        } else if (e.key === 'Backspace') {
            console.log("delete");
            handleDeleteClick(false);
        } else if (e.key == 'Enter') {
            console.log("Enter", e);
            handleEnterClick(false);
        }
    }

    const sendLetterToServer = (letter) => {
        socket.emit("letter_input", { letter, room } )
    }

    const sendDeleteToServer = () => {
        socket.emit("delete_input", { room } )
    }

    const sendSubmitToServer = () => {
        socket.emit("submit_input", { room } )
    }

    const handleGameOver = (withWinner) => {
        if (withWinner) {
            setIsWinner(true);
            socket.emit("game_over", { winner: username, room });
        } else {
            socket.emit("game_over", { winner: "none", room });
        }
        setIsGameOver(true);
    }

    return (
        <div className="game-container">
            <WordGuess word={word} guessList={guessList} currentRow={currentRow} currentWord={currentWord}
            />
            <Keyboard handleKeyUp={handleKeyUp} handleLetterClick={handleLetterClick} 
                    handleDeleteClick={handleDeleteClick} handleEnterClick={handleEnterClick}
                    getBackgroundColorClassName={getBackgroundColorClassName}
            />
            { isGameOver ? <Delayed delay={1000}><Modal isWinner={isWinner} winner={winner}/></Delayed> : <></>}
        </div>
    )
}

export default Game;