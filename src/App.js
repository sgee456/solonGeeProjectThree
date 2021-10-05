import LandingPage from "./LandingPage.js";
import Quiz from "./Quiz.js";
import FinalScore from "./FInalScore.js";

import {useState} from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Trivia App</h1> 
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
