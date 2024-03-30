import { useEffect, useState } from "react"
import Landing from "./pages/Landing"
import GameRoom from "./pages/GameRoom"
import { socket } from "./socket";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from "./hooks/useAppContext";
import Modal from "./components/Modal";
import Delayed from "./components/Delayed";

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const {username, room, isGameOver} = useAppContext();

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
      {
        (username && room)
        ? <GameRoom /> 
        : <Landing />
      }
      { 
        isGameOver ? <Delayed delay={3000}> <Modal /> </Delayed> : <></>
      }
      <ToastContainer />
    </>
  )
}

export default App;