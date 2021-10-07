import {decode} from 'html-entities';

function Radio({currentAnswerSet, setUserInput, userInput}) {
    function handleChange(event) {
        setUserInput(event.target.value);
    };

    function handleLabel(event) {
        // sets the label so that on click it changes the radio button via userInput state
        setUserInput(event.target.nextSibling.value);
    }

    return (
        <div className="answerContainer">
            {currentAnswerSet.map((question, index) => {
                //set to allow html entities to properly display
                const answerString = `${question.answer}`;
                const decodedAnswerString = decode(answerString);
    
                return(
    
                    <div className="choiceContainer" key={"choice" + index}>
                        <label 
                            htmlFor={`answer${index}`}
                            onClick={handleLabel}
                        >{decodedAnswerString}</label>
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