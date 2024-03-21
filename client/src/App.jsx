import { useEffect, useState } from "react"
import Landing from "./pages/Landing"
import GameRoom from "./pages/GameRoom"
import { socket } from "./socket";

function App() {

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [opponent, setOpponent] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  // const handleSubmit =

  // Connect to the server
  // useEffect(() => {
  //   const socket = io.connect("http://localhost:3000");
  //   console.log("socket", socket.connected, socket);

  //   // join room
  //   socket.emit("join_room", { username, room });

  //   // get opponents
  //   // const handleOpponentJoin = ({ users }) => {
  //   //   const opponentUsers = users.filter(user => user.username !== username);
  //   //   setOpponent(opponentUsers[0]);
  //   // }

  //   // socket.on("room_users", handleOpponentJoin);
  //   const handleNewMessage = ({msg}) => {
  //     setOpponent(msg);
  //   }

  //   socket.on("new_message", handleNewMessage);

  //   return () => {
  //     // socket.off("room_users", handleOpponentJoin);
  //     socket.off("new_message", handleNewMessage);
  //     socket.disconnect();
  //   }
  // }, []);

  // get opponent
  // useEffect(() => {
    

  //   // socket.on("send_msg", ({message}) => {
  //   //   console.log("Hello! ", message);
  //   // })

  //   return () => {
  //     socket.off("room_users", handleOpponentJoin)
  //   }
  // }, [opponent]);


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
        (username && room) ? <GameRoom username={username} opponent={opponent} room={room} setOpponent={setOpponent}/> : <Landing username={username} setUsername={setUsername} room={room} setRoom={setRoom} />
      }
    </>
  )
}

export default App;