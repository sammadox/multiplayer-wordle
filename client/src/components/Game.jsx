import { useEffect, useState } from "react";
import WordGuess from "./WordGuess";
import Keyboard from "./Keyboard";
import { socket } from "../socket";
import Modal from "./Modal";
import Delayed from "./Delayed";
import { toast } from "react-toastify";

function Game({room, isPlayerTurn, setIsPlayerTurn, setCurrentPlayer, opponent, username, word, toggleCurrentPlayer}) {

    const [currentWord, setCurrentWord] = useState("");
    const [currentRow, setCurrentRow] = useState(0);
    const [guessList, setGuessList] = useState([]);
    const [guessedExactLetters, setGuessedExactLetters] = useState([]);
    const [guessedNotExactLetters, setGuessedNotExactLetters] = useState([]);
    const [guessedWrongLetters, setGuessedWrongLetters] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");
    
    useEffect(() => {

        const handleLetterInputFromServer = ({ letter }) => {
            if (currentWord.length < 5) {
                setCurrentWord(prevCurrentWord => prevCurrentWord + letter);
            }
        }

        const handleDeleteFromServer = () => {
            if (currentWord.length > 0) {
                setCurrentWord(prevCurrentWord => prevCurrentWord.slice(0,-1));
            }
        }

        const handleSubmitFromServer = ({isValidWord}) => {
            if (isValidWord && currentWord.length === 5) {
                submitGuess();
                toggleCurrentPlayer();
                setIsPlayerTurn(!isPlayerTurn);
            }

            if (!isValidWord && isPlayerTurn) {
                toast.warning("Not a valid word!", {
                    position: "top-center"
                });
            }
        }

        const handleGameOverFromServer = ({ winner }) => {
            setIsGameOver(true);
            setWinner(winner);
            setIsWinner(winner === username);
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
            return "key-letter-correct-place";
        } else if (guessedNotExactLetters.includes(key)) {
            return "key-letter-wrong-place";
        } else if (guessedWrongLetters.includes(key)) {
            return "key-letter-not-present";
        }
        return "";
    }

    const submitGuess = () => {
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

        if (isPlayerTurn) {
            if (currentWord === word) {
                handleGameOver(username);
            } else if (currentRow === 5) {
                handleGameOver("none");
            }
        }
        setGuessList(prevGuestList => [...prevGuestList, currentWord]);
        setCurrentRow(prevCurrentRow => prevCurrentRow + 1);
        setCurrentWord("");
    }

    const handleLetterClick = (key) => {
        if (!isPlayerTurn) return;
        socket.emit("letter_input", { letter: key, room } )
    }

    const handleDeleteClick = () => {
        if (!isPlayerTurn) return;
        socket.emit("delete_input", { room } );
    }

    const handleEnterClick = () => {
        if (!isPlayerTurn) return;
        socket.emit("submit_input", { room, currentWord } )
    }

    const handleKeyUp = (e) => {
        e.preventDefault();
        if (!isPlayerTurn) return;
        if (e.code === `Key${e.key.toUpperCase()}`) {
            handleLetterClick(e.key.toUpperCase(), false);
        } else if (e.key === 'Backspace') {
            handleDeleteClick(false);
        } else if (e.key == 'Enter') {
            handleEnterClick(false);
        }
    }

    const handleGameOver = (winner) => {
        socket.emit("game_over", { winner, room })
    }

    return (
        <div className="game-container">
            <WordGuess word={word} guessList={guessList}
                currentRow={currentRow} currentWord={currentWord}
            />
            <Keyboard handleKeyUp={handleKeyUp} handleLetterClick={handleLetterClick} 
                    handleDeleteClick={handleDeleteClick} handleEnterClick={handleEnterClick}
                    getBackgroundColorClassName={getBackgroundColorClassName}
            />
            { isGameOver ? <Delayed delay={4000}><Modal isWinner={isWinner} winner={winner} word={word}/></Delayed> : <></>}
        </div>
    )
}

export default Game;