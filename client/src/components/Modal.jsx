import { useEffect } from "react";

function Modal({isWinner}) {
    useEffect(() => {
        const timer = setTimeout(() => {}, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>You {isWinner ? "won!" : "Lost!"}</h1>
            </div>
        </div>
    );
}

export default Modal;