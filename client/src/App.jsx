import { useEffect, useState } from "react"
import Landing from "./pages/Landing"
import GameRoom from "./pages/GameRoom"
import { socket } from "./socket";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from "./hooks/useAppContext";

function App() {

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [opponent, setOpponent] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [word, setWord] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [])

  return (
    <>
      <AppContextProvider>
      {
        (username && room)
        ? <GameRoom username={username} opponent={opponent} 
                  room={room} setOpponent={setOpponent} 
                  word={word} setWord={setWord} setRoom={setRoom}
          /> 
        : <Landing username={username} setUsername={setUsername}
                 room={room} setRoom={setRoom}
          />
      }
      </AppContextProvider>
      <ToastContainer />
    </>
  )
}

export default App;