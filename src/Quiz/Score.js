function Score({score, quizLength, currentQuestion}) {
    return (
        <div className="score">
            <div className="wrapper">
                <p>Current Score: {score}</p>
                <p>Question {currentQuestion + 1} out of {quizLength}</p>
            </div>
        </div>
    );
};

export default Score;