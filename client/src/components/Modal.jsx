import { useEffect } from "react";



function Modal({isWinner, winner, word}) {
    useEffect(() => {
        const timer = setTimeout(() => {}, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>You { winner !== "none" ? isWinner ? "won!" : "lost!" : "couldn't find!"}</h1>
                <div className="final-show">The word was &nbsp;
                    <span>
                        {word.split("").map((wordCharacter, index) => {
                            const style = {"animationDelay" : `${0.5 + index/10}s`};
                            return <span key={index} style={style} >{wordCharacter}</span>
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Modal;