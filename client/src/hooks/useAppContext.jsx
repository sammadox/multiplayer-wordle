import { createContext, useContext, useState } from "react";
import { socket } from "../socket";
import { toast } from "react-toastify";

const AppContext = createContext();
export const AppContextProvider = ({children}) => {

    const getRoomName = () => {
        const generatorString = "abcdefghijklmnopqrstuvwxyz";
        let roomName = "";
        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * generatorString.length);
            roomName += generatorString.charAt(randomIndex);
        }
        return roomName;
    }

    const initialWordGrid = [
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',],
        ['', '', '', '', '',]
    ];

    const [wordGrid, setWordGrid] = useState(initialWordGrid);
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [opponent, setOpponent] = useState("");
    const [word, setWord] = useState("");

    const [currentPlayer, setCurrentPlayer] = useState("");
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const [currentWord, setCurrentWord] = useState("");
    const [currentRow, setCurrentRow] = useState(0);
    const [guessedExactLetters, setGuessedExactLetters] = useState([]);
    const [guessedNotExactLetters, setGuessedNotExactLetters] = useState([]);
    const [guessedWrongLetters, setGuessedWrongLetters] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");
    
    const startGame = (roomName) => {
        socket.connect();
        socket.emit("join_room", { username, room: roomName });
    }

    const handlePlayAgain = () => {
        setOpponent("");
        setCurrentPlayer("");
        setIsPlayerTurn(false);
        setCurrentWord("");
        setCurrentRow(0);
        setGuessedExactLetters([]);
        setGuessedNotExactLetters([]);
        setGuessedWrongLetters([]);
        setIsGameOver(false);
        setIsWinner(false);
        setWinner(true);
        setWord("");
        setWordGrid(initialWordGrid);
        socket.emit("join_room", { username, room });
    }

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
        if (currentWord.length < 5) return;
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

    const toggleCurrentPlayer = () => {
        if (currentPlayer === username) {
            setCurrentPlayer(opponent);
        } else {
            setCurrentPlayer(username);
        }
    }

    const handleGameOver = (winner) => {
        socket.emit("game_over", { winner, room })
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
        setCurrentRow(prevCurrentRow => prevCurrentRow + 1);
        setCurrentWord("");
    }

    const handleLetterInputFromServer = ({ letter }) => {
        if (currentWord.length < 5) {
            let position = currentWord.length;
            setCurrentWord(prevCurrentWord => prevCurrentWord + letter);
            const newGrid = [...wordGrid];
            newGrid[currentRow][position] = letter;
            setWordGrid(newGrid);
        }
    }

    const handleDeleteFromServer = () => {
        if (currentWord.length > 0) {
            let position = currentWord.length;
            setCurrentWord(prevCurrentWord => prevCurrentWord.slice(0,-1));
            const newGrid = [...wordGrid];
            newGrid[currentRow][position-1] = '';
            setWordGrid(newGrid);
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
        socket.emit("leave_room", {room});
    }

    const handleNewOpponent = (data) => {
        setOpponent(data.username);
    }

    const handleCurrentPlayer = ({ user }) => {
        setCurrentPlayer(user.username);
        if (user.username === username) {
            setIsPlayerTurn(true);
        }
    }

    const handleGameWord = ({ word }) => {
        setWord(word);
    }

    const toastOptions = {
        position: "bottom-center"
    };

    const handleRoomFull = () => {
        toast.error("Room full! Try another or create one!", toastOptions);
        setRoom("");
    }

    return <AppContext.Provider value={
            {
                getRoomName, startGame,
                getBackgroundColorClassName,
                wordGrid, setWordGrid,
                room, setRoom,
                username, setUsername,
                opponent, setOpponent,
                word, setWord,
                currentPlayer, setCurrentPlayer,
                isPlayerTurn, setIsPlayerTurn,
                currentWord, setCurrentWord,
                currentRow, setCurrentRow,
                guessedExactLetters, setGuessedExactLetters,
                guessedNotExactLetters, setGuessedNotExactLetters,
                guessedWrongLetters, setGuessedWrongLetters,
                isGameOver, setIsGameOver,
                isWinner, setIsWinner,
                winner, setWinner,
                handleKeyUp, handleLetterClick,
                handleDeleteClick, handleEnterClick,
                toggleCurrentPlayer, submitGuess,
                handleLetterInputFromServer, handleDeleteFromServer,
                handleSubmitFromServer, handleGameOverFromServer,
                handleNewOpponent, handleCurrentPlayer,
                handleGameWord, handleRoomFull, handlePlayAgain
            }
        }
    >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}