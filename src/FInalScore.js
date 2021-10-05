function FinalScore({score, quizLength, setCurrentPage, setScore}) {
    function handleClick() {
        setScore(0);
        setCurrentPage(1);
    };

    return(
        <div className="finalScoreContainer wrapper">  
            <p>You scored {score} out of {quizLength} questions.</p>
            <button onClick={handleClick}>Play Again?</button>
        </div>
    );
};

export default FinalScore;