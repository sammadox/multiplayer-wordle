function WordGuess({ word, guessList, currentRow, currentWord }) {
    const placeholderArray = ['', '', '', '', ''];
    const renderCurrentWord = currentWord.padEnd(5, " ");
    const renderList = guessList.length === 5 ? guessList : [...guessList, renderCurrentWord, ...new Array(5 - guessList.length - 1).fill("      ")];
    return (
        <div className="word-grid">
            {
                renderList.map((guess, idx) => {
                    return <div key={`row-${idx}`} className="word-row">
                        {
                            placeholderArray.map((_, index) => {
                                const bgClass = (idx < currentRow) ? (word[index] === guess[index] ? "word-letter-correct-place" : (word.includes(guess[index]) ? "word-letter-wrong-place" : "word-letter-not-present")) : "";

                                return <div key={`letter-0-${index}`} className={`word-letter ${bgClass}`}>{guess[index]}</div>
                            })
                        }
                    </div>
                })
            }
        </div>

    );
}

export default WordGuess;