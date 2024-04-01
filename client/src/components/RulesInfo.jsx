import { useEffect, useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";

function RulesInfo() {

    const {handleShowRules} = useAppContext();
    const modalRef = useRef();
    const overlayRef = useRef();

    const handleDialogClick = (e) => {
        if ((e.target === overlayRef.current || overlayRef.current.contains(e.target)) &&
            (e.target !== modalRef.current && !modalRef.current.contains(e.target))) {
            handleShowRules();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDialogClick);

        return () => document.removeEventListener("click", handleDialogClick);
    }, [handleDialogClick]);

    return (
        <div className="rules-overlay" ref={overlayRef}>
            <div className="rules-modal-container" ref={modalRef}>
                <div className="rules-heading">
                    <button className="rules-close-btn" onClick={handleShowRules}>X</button>
                    <h1>Rules</h1>
                </div>
                <p className="example-text">Guess the 5 letter word before your opponent!</p>
                <div className="rules-main">
                    <ul>
                    <li>Each player takes turn to guess the word.</li>
                    <li>A total of 6 tries(3 each) to figure it out.</li>
                    <li>Each guess must be a valid 5 letter word.</li>
                    <li>The color of tiles will change to indicate how close you are to the word.</li>
                    </ul>
                </div>
                <h4 className="example-heading">Example:</h4>
                <p className="example-text">If the submitted guess is <b>SPEAK</b>.</p>
                <div className="example-display">
                    <div className="rule-example-letter word-letter-correct-place flipped">S</div>
                    <div className="rule-example-letter word-letter-not-present flipped">P</div>
                    <div className="rule-example-letter word-letter-wrong-place flipped">E</div>
                    <div className="rule-example-letter word-letter-not-present flipped">A</div>
                    <div className="rule-example-letter word-letter-not-present flipped">K</div>
                </div>
                <div>
                    <ul>
                        <li><b>S</b> is in the word and in the correct place.</li>
                        <li><b>E</b> is in the word but not in the correct place.</li>
                        <li><b>P A K</b> are not in the word.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RulesInfo;