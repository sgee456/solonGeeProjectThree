function FinalScore({score, quizLength, setCurrentPage, setScore, highScoreArray}) {
    function handleReset() {
        setScore(0);
        setCurrentPage(1);
    };

    function handleHighScore() {
        //check if score is above 
        setCurrentPage(4);
    }

    return(
        <div className="finalScoreContainer wrapper">  
            <p>You scored {score} out of {quizLength} questions.</p>
            <button className="viewHighScore" onClick={handleHighScore}>See High Score</button>
            <button className="playAgain" onClick={handleReset}>Play Again?</button>
        </div>
    );
};

export default FinalScore;