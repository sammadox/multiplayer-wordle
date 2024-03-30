import WordGridRow from "./WordGridRow";

function WordGrid() {

    return (
        <div className="word-grid">
            <WordGridRow row={0}/>
            <WordGridRow row={1}/>
            <WordGridRow row={2}/>
            <WordGridRow row={3}/>
            <WordGridRow row={4}/>
            <WordGridRow row={5}/>
        </div>

    );
}

export default WordGrid;