import { useEffect } from "react";

function Modal({isWinner, winner}) {
    useEffect(() => {
        const timer = setTimeout(() => {}, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>You { winner !== "none" ? isWinner ? "won!" : "lost!" : "draw!"}</h1>
            </div>
        </div>
    );
}

export default Modal;