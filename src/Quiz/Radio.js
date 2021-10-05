function Radio({currentAnswerSet, setUserInput}) {
    function handleChange(event) {
        setUserInput(event.target.id);
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
                            id ={`answer${index}`}
                            value={question.isCorrect}
                            onChange={handleChange}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Radio;