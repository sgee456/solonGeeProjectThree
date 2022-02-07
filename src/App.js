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
    
    //creates an unordered highScore
    for (let scoreObj in databaseObj) {
      const newScoreObj = {...databaseObj[scoreObj], scoreKey: scoreObj};
      highScore.push(newScoreObj);
    }

    //ordered score from highest to lowest
    const orderedHighScore = highScore.sort((firstScore, secondScore) => {
      return secondScore.userScore - firstScore.userScore;
    });
    setHighScoreArray(orderedHighScore);
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
            currentQuiz= {currentQuiz} 
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

//App Overview

//The App has four main components: 
// 1. LandingPage
// 2. Quiz
// 3.FinalScore
// 4.HighScore
//the state of a currentPage variable in App determines which one is rendered on the page
//to cycle between each, the state of currentPage is changed


// Steps

//when app is initialized, database subscription is established in order to get saved high scores. Loop through this data object and create an array where each item is ordered by score and save this into state. Everytime the database is updated, repeat this loop and save new ordered array to state.

//LandingPage shows name of app, short explanation, has Form component inside
//Form component to narrow user choices for quiz
//eg. how many questions to store, what category of questions 
//using onSubmit on Form container, use user submitted data to make an api call to the Open Trivia API, unmount LandingPage component and mount Quiz component, which has Question and Score component inside
//store json data of quiz questions from API call in currentQuiz (App state) for use in Quiz component

//Quiz component displays individual questions, selectable multiple choice answers and a submit button
//When the user selects the answer via radio buttons and hits submit on submit button, "incorrect" or "correct" is displayed briefly, score is updated, submit button is hidden/removed and next question button revealed

//Score component shows current score, as well as the current question # out of 	total questions
//when the user answers questions, score and current question # are changed via state


//when end of quiz is reached, Quiz component is unmounted and FinalScore component is mounted
//FinalScore component will display the users final score, and an button to reset the page and play again
// also checks if there is a new high score using database information that was saved at the start of App
//If there is, allows user to save that high score to the database, and deletes lowest score from database.
//our subscription resends the new high score data back to us for display

//HighScore displays the high score data.