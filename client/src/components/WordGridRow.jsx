import { useAppContext } from "../hooks/useAppContext";

function getCounter(word){
    let counter = new Map()
    word.split("").map((letter) => {
        if (!counter.has(letter)) {
            counter[letter] = 0;
        }
        counter[letter]++;
    });
    return counter;
}

function WordGridRow({row, word, currentRow}) {

    const {wordGrid} = useAppContext();
    let bgClass = new Array(5).fill("");
    if (row < currentRow && word) {
        console.log("Checking", wordGrid, word);
        let wordCounter = getCounter(word);
        let guessCounter = new Map();
        wordGrid[row].map((letter, index)=>{
            guessCounter[letter] = 0;
            guessCounter[word[index]] = 0;
        });
        for (let i = 0; i < 5; i++) {
            guessCounter[wordGrid[row][i]] += 1;
            if (wordGrid[row][i] === word[i]) {
                bgClass[i] = "word-letter-correct-place flipped";
            } else if (guessCounter[wordGrid[row][i]] <= wordCounter[wordGrid[row][i]]) {
                bgClass[i] = "word-letter-wrong-place flipped";
            } else {
                bgClass[i] = "word-letter-not-present flipped";
            }
        }
    }
    if (word === wordGrid[row].join("")) {
        for (let i = 0; i < 5; i++) {
            bgClass[i] = bgClass[i].replace("flipped", "final");
        }
    }

    return(
        <div className="word-row">
            <div className={`word-letter ${bgClass[0]}`} style={{"animationDelay" : '0s'}}>{wordGrid[row][0]}</div>
            <div className={`word-letter ${bgClass[1]}`} style={{"animationDelay" : '0.15s'}}>{wordGrid[row][1]}</div>
            <div className={`word-letter ${bgClass[2]}`} style={{"animationDelay" : '0.3s'}}>{wordGrid[row][2]}</div>
            <div className={`word-letter ${bgClass[3]}`} style={{"animationDelay" : '0.45s'}}>{wordGrid[row][3]}</div>
            <div className={`word-letter ${bgClass[4]}`} style={{"animationDelay" : '0.6s'}}>{wordGrid[row][4]}</div>
        </div>
    )
}

export default WordGridRow;