import {useEffect, useState} from 'react';
import {decode} from 'html-entities';

import Radio from './Quiz/Radio.js';
import Score from './Quiz/Score.js';

function Quiz({currentQuiz, setCurrentPage, currentPage, setScore, score}) {
    

    const [currentQuestion, setCurrentQuestion] =useState(0);
    const [userInput, setUserInput] = useState(null);
    const [currentAnswerSet, setCurrentAnswerSet] = useState([]);
    const [buttonShow, setButtonShow] = useState(true);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    //function that creates an array of multiple choice answers to display on the page by splicing the correct answer into the array of incorrect answers at a random spot
    function randomizeAnswers({incorrect_answers, correct_answer}) {
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

    //When currentQuestion changes, re-randomize answers
    useEffect(() => {
        const answerArray = randomizeAnswers(currentQuiz[currentQuestion]);
        setCurrentAnswerSet(answerArray);
    }, [currentQuiz, currentQuestion]);

    //when the user hits submit, userInput is checked to make sure that user has selected an option then calls checkAnswer
    //alerts if unchecked
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
            alert('please select an option');
        }
    };

    //checks if answer is correct, increments score (App state) if so. takes away submit button/ reveals next question button and shows correct or incorrect via answerCorrect 
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

    //when the user clicks for next question, current question changes, submit button/ next question visibility toggled back. currentQuestion change causes randomizeAnswers to be called on new answer set 
    function handleNextButton(event) {
        if (currentQuestion + 1 < currentQuiz.length) {
            setCurrentQuestion(currentQuestion + 1);
            setButtonShow(true);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    //sets html in order for html entities to display in jsx
    const htmlQuestion = currentQuiz[currentQuestion].question
    const decodedHtmlQuestion = decode(htmlQuestion)

    const htmlCorrectAnswer = currentQuiz[currentQuestion].correct_answer
    const decodedHtmlAnswer = decode(htmlCorrectAnswer);

    return(
        <>

            <div className="wrapper">
                <form
                    className="quizForm"
                    onSubmit={handleSubmit}
                >
                    <h2 className="questionHeader">{decodedHtmlQuestion}</h2>
                    <Radio currentAnswerSet={currentAnswerSet} setUserInput={setUserInput}
                    userInput={userInput} />

                    { buttonShow ?
                        <button type="submit">Submit</button>:
                        answerCorrect ?
                            <p>Correct!</p>:
                            <p>Incorrect... The correct answer is <span>{decodedHtmlAnswer}</span>.
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
                quizLength={currentQuiz.length}
                currentQuestion={currentQuestion} />
        </>
    );
};

export default Quiz;