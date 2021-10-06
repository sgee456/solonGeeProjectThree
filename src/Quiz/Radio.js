function Radio({currentAnswerSet, setUserInput, userInput}) {
    function handleChange(event) {
        setUserInput(event.target.value);
    };

    return (
        <div className="answerContainer">
            {currentAnswerSet.map((question, index) => {
                //set to allow html entities to properly display
                const answerString = `${question.answer}`;
    
                return(
    
                    <div className="choiceContainer" key={"choice" + index}>
                        <label 
                            htmlFor={`answer${index}`} 
                            dangerouslySetInnerHTML={{__html: answerString}}>
                        </label>
                        <input 
                            name="quizAnswer"
                            type="radio" 
                            value={`answer${index}`}
                            onChange={handleChange}
                            checked={userInput === `answer${index}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Radio;