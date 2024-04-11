import { useAppContext } from "../hooks/useAppContext";
import { socket } from "../socket";
import ChatBubble from "./ChatBubble";
import { IconContext } from "react-icons/lib";
import { MdSend } from "react-icons/md";

function ChatWindow () {

    const {
        setShowChat, room, username, messages,
        chatInputRef, setNewMessageReceived
    } = useAppContext();

    const closeChat = () => {
        setShowChat(false);
        setNewMessageReceived(false);
    }

    const sendMessage = () => {
        if (chatInputRef.current.value !== "") {
            socket.emit("send_message", {room, username, message: chatInputRef.current.value});
            chatInputRef.current.value = "";
        }
    }

    return (
        <div className="chat-window">
            <div className="chat-control">
                <div className="close-chat" onClick={closeChat}>X</div>
            </div>
            <div className="chat-box">
                {
                    messages.map((message, index) => {
                        return <ChatBubble key={index} message={message} />
                    })
                }
            </div>
            <div className="chat-input">
                <input ref={chatInputRef} type = "text"/>
                <button onClick={sendMessage}>
                    <IconContext.Provider value={{className: "chat-send-icon"}}>
                        <MdSend />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}

export default ChatWindow;