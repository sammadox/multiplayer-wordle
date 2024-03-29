import WordGridRow from "./WordGridRow";

function WordGrid({ word, currentRow }) {
    
    return (
        <div className="word-grid">
            <WordGridRow currentRow={currentRow} word={word} row={0}/>
            <WordGridRow currentRow={currentRow} word={word} row={1}/>
            <WordGridRow currentRow={currentRow} word={word} row={2}/>
            <WordGridRow currentRow={currentRow} word={word} row={3}/>
            <WordGridRow currentRow={currentRow} word={word} row={4}/>
            <WordGridRow currentRow={currentRow} word={word} row={5}/>
        </div>

    );
}

export default WordGrid;