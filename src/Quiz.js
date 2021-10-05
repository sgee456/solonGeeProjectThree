import {useEffect, useState} from 'react';

import Radio from './Quiz/Radio.js';
import Score from './Quiz/Score.js';

function Quiz({quizInfo, setCurrentPage, currentPage, setScore, score}) {
    

    const [currentQuestion, setCurrentQuestion] =useState(0);
    const [userInput, setUserInput] = useState(null);
    const [currentAnswerSet, setCurrentAnswerSet] = useState([]);
    const [buttonShow, setButtonShow] = useState(true);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    function randomizeQuestions({incorrect_answers, correct_answer}) {
        const answerArray = incorrect_answers.map( (incorrectAnswer) => {
            return {
                answer: incorrectAnswer,
                isCorrect: false
            };
        });


        const randomNumber = Math.floor(Math.random() * (incorrect_answers.length + 1));

        const correctAnswer = {
            answer: correct_answer,
            isCorrect: true
        };

        //adds correct answer at random index in array
        answerArray.splice(randomNumber, 0, correctAnswer);

        return answerArray;
        
    }

    useEffect(() => {
        //only when current question changes do we want to rerandomize questions
        const answerArray = randomizeQuestions(quizInfo[currentQuestion]);
        setCurrentAnswerSet(answerArray);
    }, [quizInfo, currentQuestion]);


    function handleSubmit(event) {
        event.preventDefault();
    
        if (userInput === null) {
            alert('please select an option');
        } else if (userInput ==='answer0') {
            checkAnswer(currentAnswerSet[0].isCorrect);
        } else if (userInput ==='answer1') {
            checkAnswer(currentAnswerSet[1].isCorrect);
        } else if (userInput ==='answer2' && currentAnswerSet.length > 2) {
            checkAnswer(currentAnswerSet[2].isCorrect);
        } else if (userInput ==='answer3' && currentAnswerSet.length > 3) {
            checkAnswer(currentAnswerSet[3].isCorrect);
        } else {
            //alerts if unchecked when currentAnswerSet changes length 
            alert('please select an option');
        }
    };

    function checkAnswer(answer) {
        if (answer) {
            setScore(score + 1);
            setButtonShow(false);
            setAnswerCorrect(true);
        } else {
            setButtonShow(false);
            setAnswerCorrect(false);
        }
    };

    function handleNextButton(event) {
        if (currentQuestion + 1 < quizInfo.length) {
            setCurrentQuestion(currentQuestion + 1);
            setButtonShow(true);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    //sets html in order for html entities to work
    const htmlQuestion = quizInfo[currentQuestion].question
    const htmlCorrectAnswer = quizInfo[currentQuestion].correct_answer

    return(
        <>

            <div className="wrapper">
                <form
                    className="quizForm"
                    onSubmit={handleSubmit}
                >
                    <h2
                        className="questionHeader" 
                        dangerouslySetInnerHTML={{__html: htmlQuestion}}>
                    </h2>
                    <Radio currentAnswerSet={currentAnswerSet} setUserInput={setUserInput} />

                    { buttonShow ?
                        <button type="submit">Submit</button>:
                        answerCorrect ?
                            <p>Correct!</p>:
                            <p>Incorrect... The correct answer is <span dangerouslySetInnerHTML={{__html: htmlCorrectAnswer}}></span>.
                            </p>
                    }

                    { !buttonShow ?
                        <button onClick ={handleNextButton}>Next Question</button> :
                        ""
                    }

                </form>
            </div>

            <Score
                score={score}
                quizLength={quizInfo.length}
                currentQuestion={currentQuestion} />
        </>
    );
};

export default Quiz;