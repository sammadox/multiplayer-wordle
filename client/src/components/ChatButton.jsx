import { MdChat } from "react-icons/md";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { useAppContext } from "../hooks/useAppContext";
import { useEffect } from "react";

function ChatButton () {

    const {setShowChat, newMessageReceived, setNewMessageReceived} = useAppContext();

    const handleChatWindow = () => {
        setShowChat(true);
        setNewMessageReceived(false);
    }

    return (
        <IconContext.Provider value={{className: "floating-chat-button"}} >
            <div onClick={handleChatWindow}>
                {newMessageReceived ? <MdMarkUnreadChatAlt /> : <MdChat />}
            </div>
        </IconContext.Provider>
    )
}

export default ChatButton;