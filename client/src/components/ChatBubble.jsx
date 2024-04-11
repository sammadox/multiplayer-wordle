import { useEffect, useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";

function ChatBubble ({message}) {

    const containerClass = message.isMyText ? "player-bubble-container" : "opponent-bubble-container";
    const bubbleClass = message.isMyText ? "player-bubble" : "opponent-bubble"

    const messageRef = useRef();
    const {messages} = useAppContext();

    useEffect(()=> {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            })
        }
    },[messages]);

    return (
        <div ref={messageRef} className={`chat-bubble-container ${containerClass}`}>
            <div className={`chat-bubble ${bubbleClass}`}>
                {message.text}
            </div>
        </div>
    )
}

export default ChatBubble;