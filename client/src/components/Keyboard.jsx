import { useEffect } from "react";

function Keyboard({handleKeyUp, handleLetterClick, handleDeleteClick, handleEnterClick, getBackgroundColorClassName}) {

    const keyRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keyRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keyRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [handleKeyUp]);

    return (
        <div className="keyboard-container">
            <div className="keyboard-grid">
                <div className="keyboard-row">
                    {
                        keyRow1.map((key) => {
                            return <button className={getBackgroundColorClassName(key)} key={`btn-${key}`} onClick={() => handleLetterClick(key)}>{key}</button>
                        })
                    }
                </div>
                <div className="keyboard-row">
                    {
                        keyRow2.map((key) => {
                            return <button className={getBackgroundColorClassName(key)} key={`btn-${key}`} onClick={() => handleLetterClick(key)}>{key}</button>
                        })
                    }
                </div>
                <div className="keyboard-row">
                    <button onClick={handleDeleteClick}>Delete</button>
                    {
                        keyRow3.map((key) => {
                            return <button className={getBackgroundColorClassName(key)} key={`btn-${key}`} onClick={() => handleLetterClick(key)}>{key}</button>
                        })
                    }
                    <button onClick={handleEnterClick}>Enter</button>
                </div>
            </div>
        </div>
    );
}

export default Keyboard;