function WordGuess({ word, guessList, currentRow, currentWord }) {
    const placeholderArray = ['', '', '', '', ''];
    const renderCurrentWord = currentWord.padEnd(word.length, " ");
    const renderList = guessList.length === 6 ? guessList : [...guessList, renderCurrentWord, ...new Array(6 - guessList.length - 1).fill("      ")];
    return (
        <div className="word-grid">
            {
                renderList.map((guess, idx) => {
                    const addFinalClass = (guess === word);

                    return <div key={`row-${idx}`} className="word-row">
                        {
                            placeholderArray.map((_, index) => {
                                let bgClass = (idx < currentRow) ? (word[index] === guess[index] ? "word-letter-correct-place flipped" : (word.includes(guess[index]) ? "word-letter-wrong-place flipped" : "word-letter-not-present flipped")) : "";
                                
                                if (addFinalClass) {
                                    bgClass = bgClass.replace("flipped", "final");
                                }
                                const style = {"animationDelay" : `${index/5}s`};
                                return <div key={`letter-0-${index}`} style={style} className={`word-letter ${bgClass}`}>
                                    {guess[index]}
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>

    );
}

export default WordGuess;