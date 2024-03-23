function GameDetails({ room, username, opponent, currentPlayer }) {

    return (
        <div className="game-details-card">
            {!opponent ? <p id="game-code">Your shareable room code: <b>{room}</b></p> : <></> }
            { opponent ? <p id="game-battle">{username} vs {opponent}</p> : <></>}
            {opponent ? <p key={currentPlayer} id="game-turn">{(currentPlayer === username) ? "Your turn!" : `${opponent}'s turn!`}</p> : <></>} 
        </div>
    );
}

export default GameDetails;