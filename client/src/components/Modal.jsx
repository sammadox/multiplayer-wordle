import { useState } from "react";
import { MdReplay } from "react-icons/md";
import { useAppContext } from "../hooks/useAppContext";

function Modal() {
    
    const [style, setStyle] = useState({});

    const {isWinner, winner, word, handlePlayAgain} = useAppContext();

    const handleOnMouseMove = (e) => {
        let x = e.clientX;
        let y = e.clientY;
        const newStyle = {
            left: `${x+15}px`,
            top: `${y}px`
        }
        setStyle(newStyle);
    }

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
                <div className="play-again">
                    <button onMouseMove={handleOnMouseMove} onClick={handlePlayAgain}>
                        <MdReplay/>
                        <div id="tooltip" style={style}>Play again!</div>
                    </button>
                </div>
                <div className="tooltipbox">
                    <div className="triangle"></div>
                    <div className="box">Play Again</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;