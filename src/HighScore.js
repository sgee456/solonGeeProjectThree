function HighScore({setScore, highScoreArray, setCurrentPage}) {
    function handleReset() {
        setScore(0);
        setCurrentPage(1);
    };
    
    return(
        <div className="highScoreContainer">
            <h2>High Score:</h2>
            <ol>{
                highScoreArray.map((scoreObj) =>{
                    return(
                        <li key={scoreObj.scoreKey}>
                            <p>{scoreObj.userName}: {scoreObj.userScore} </p>
                        </li>
                    );
                })}
            </ol>
            <button onClick={handleReset}>Play again?</button>
        </div>
    );
}

export default HighScore;