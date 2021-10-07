import LandingPage from "./LandingPage.js";
import Quiz from "./Quiz.js";
import FinalScore from "./FInalScore.js";

import {useEffect, useState} from 'react';
import realtime from './firebase.js';
import {ref, onValue} from 'firebase/database';
import HighScore from "./HighScore.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [highScoreArray, setHighScoreArray] = useState([]);

  //A function that takes database object that is returned and pushes each object inside an array with a maximum length of 10. the object with the highest userScore is at index 0 and the next lowest score is 1, etc... this array is stored in highScoreArray and used to display high scores in HighScore

  const orderDatabase = (databaseObj) => {
    const highScore = [];
    
    for (let scoreObj in databaseObj) {
      const newScoreObj = {...databaseObj[scoreObj], scoreKey: scoreObj};
      //logic that determines where each newScoreObj is spliced into highScoreArray
      //checks every possible spot in the array. When it finds a spot where it is above a number in userScore or the spot is undefined/ has no obj, it splices its value just before.
      for (let i = 0; i < 9; i++) {
        if (highScore[i] === undefined || highScore[i].userScore <= newScoreObj.userScore) {
          highScore.splice(i, 0, newScoreObj);
          i += 9;
        }
      }
    }
    setHighScoreArray(highScore);
  };

  //set up our database subscription, and call orderDatabase on the response object before passing it into state as an ordered array in highScoreArray.
  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      const currentDatabase = snapshot.val();
      orderDatabase(currentDatabase);
    })
  }, []);

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Trivia Time!</h1> 
          {
            currentPage === 1?
            <p>Select the questions you want in your quiz below.</p>:
            ""
          }
        </div>
      </header>

      <main>
        {
          currentPage === 1 ?
          <LandingPage 
            setCurrentQuiz ={setCurrentQuiz}
            setupPage ={setCurrentPage}
          /> :
          ""
        }
        {
          currentPage === 2 ?
          <Quiz 
            quizInfo= {currentQuiz} 
            setCurrentPage={setCurrentPage}
            currentPage= {currentPage}
            setScore={setScore}
            score={score} /> :
          ""
        }
        {
          currentPage === 3 ?
          <FinalScore
            score= {score}
            quizLength={currentQuiz.length}
            setCurrentPage= {setCurrentPage}
            setScore= {setScore}
            highScoreArray= {highScoreArray}
            setHighScoreArray= {setHighScoreArray}
            /> :
          ""
        }
        {
          currentPage === 4 ?
          <HighScore 
          setScore ={setScore}
          highScoreArray= {highScoreArray}
          setCurrentPage= {setCurrentPage}
          /> :
          ""
        }
      </main>

      <footer>
        <div className="wrapper">
          <p>Made at <a href="https://junocollege.com/">Juno College</a> by Solon Gee, using the <a href="https://opentdb.com/api_config.php">Open Trivia Database</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;


//The App has three main components: 
// 1. LandingPage
// 2. Quiz
// 3.FinalScore
//the state of a currentPage variable in App determines which one is rendered on the page
//to cycle between each, the state of currentPage is changed


// Steps


//mount LandingPage component
//LandingPage shows name of app, short explanation, has Form component inside
//Form component to narrow user choices for quiz
//eg. how many questions to store, what category of questions 

//using onSubmit on Form container, use user submitted data to make an api call to the Open Trivia API, unmount LandingPage component and mount Quiz component, which has Question and Score component inside

//store json data from API call in a variable
//Question component displays individual questions, selectable multiple choice answers and a submit button
//json data is used to change the state of Question component, allowing new 		questions and answers to be displayed
//When the user selects the answer via radio buttons and hits submit on submit button, "incorrect" or "correct" is displayed briefly, submit button is hidden/removed and then state of Question and Score components are updated to reset the page for the new question

//Score component shows current score, as well as the current question # out of 	total questions
//when the user answers questions, score and current question # are changed via state


//when end of quiz is reached, unmount Quiz component and mount FinalScore component
//FinalScore component will display the users final score, and an button to reset the page and play again
//this button will unmount the FinalScore and re-mount LandingPage
//also have buttons 
//also have button to see HighScore component, and a form to submit i


//Store the final state of the Score component in a Firebase database that acts as a scoreboard, display high score in a HighScore component in final score