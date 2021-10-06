function HighScore({setScore, highScoreArray, setCurrentPage}) {
    function handleReset() {
        setScore(0);
        setCurrentPage(1);
    };
    
    return(
        <div className="wrapper">
            <div className="highScoreContainer">
                <h2>High Score:</h2>
                <div className="innerWrapper">
                    <ol>{
                        highScoreArray.map((scoreObj, index) =>{
                            return(
                                <li key={scoreObj.scoreKey}>
                                    <p><span className="bold">{index + 1}. </span>{scoreObj.userName} </p>
                                    <p>{scoreObj.userScore} {scoreObj.userScore === 1?"point": "points"}</p>
                                </li>
                            );
                        })}
                    </ol>
                </div>
                
                <button onClick={handleReset}>Play again?</button>
            </div>
        </div>
    );
}

export default HighScore;