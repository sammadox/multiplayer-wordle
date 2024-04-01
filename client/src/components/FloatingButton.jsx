import { useAppContext } from "../hooks/useAppContext";

function FloatingButton () {

    const {handleShowRules} = useAppContext();

    return (
        <button className="floating-button" onClick={handleShowRules}>
            <div>i</div>
        </button>
    )
}

export default FloatingButton;