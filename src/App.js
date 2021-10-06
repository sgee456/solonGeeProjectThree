import LandingPage from "./LandingPage.js";
import Quiz from "./Quiz.js";
import FinalScore from "./FInalScore.js";

import {useEffect, useState} from 'react';
import realtime from './firebase.js';
import {ref, onValue, push, remove} from 'firebase/database';
import HighScore from "./HighScore.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [highScoreArray, setHighScoreArray] = useState([]);

  //function that takes our database object that we get and pushes each object inside. the object with the highest userScore is at index 0 and the next lowest score is 1, etc. It should be a maximum length of 10

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

  //set up our database subscription, and call orderDatabase on the response object before passing it into state
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
            <p>Choose what kind of questions you want in your quiz. <br/>Easy questions are worth 3 points, <br/>medium are worth 4 points, <br/> and hard are worth 5 points. </p>:
            ""
          }
        </div>
      </header>

      <main>
        {
          currentPage === 1 ?
          <LandingPage 
            setupQuiz ={setCurrentQuiz}
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
          <p>Made at <a href="https://junocollege.com/">Juno College</a>, using the <a href="https://opentdb.com/api_config.php">Open Trivia Database</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
