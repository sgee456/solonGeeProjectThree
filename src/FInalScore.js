import { useState } from 'react';
import realtime from './firebase.js';
import {ref, push, remove} from 'firebase/database';


function FinalScore({score, quizLength, setCurrentPage, setScore, highScoreArray}) {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] =useState(false);

    function handleReset() {
        setScore(0);
        setCurrentPage(1);
    };

    function handleHighScore() {
        //check if score is above 
        setCurrentPage(4);
    }

    function checkHighScore(event, score, highScoreArray) {
        event.preventDefault();
        const dbRef = ref(realtime); 
        const newHighScore = {
            userName: name,
            userScore: score
          };
        //if highScoreArray has a length of 10 and input field is not blank, use the scoreKey of its last object to find it in the database and delete it
        if (!name) {
            alert('Please enter your name.');
        }
        if (name !== "" && highScoreArray.length > 9) {
            console.log(name);
            const lastScoreIndex = highScoreArray.length - 1;
            const lastScoreKey = highScoreArray[lastScoreIndex].scoreKey;
            const lastScoreRef = ref(realtime, lastScoreKey);
            remove(lastScoreRef);
        }
        //push to database
        if (name !== "") {
            push(dbRef, newHighScore);
            setSubmitted(true);
        }
    }

    return(
        <div className="finalScoreContainer wrapper">  
            <p>You scored {score} out of {quizLength} questions.</p>
            {
                (highScoreArray.length === 0 || score > highScoreArray[highScoreArray.length - 1].userScore) && !submitted?
            (<form 
                className="highScoreSubmit" 
                onSubmit={(event) => {checkHighScore(event, score, highScoreArray)}}
            >
                <label htmlFor="changeScore">New high score! Please enter your name:</label>
                <input 
                    type="text" 
                    id="changeScore"
                    value={name}
                    maxLength="10"
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit High Score</button>
            </form>):
            ""
            }
            <button className="viewHighScore" onClick={handleHighScore}>See High Score</button>
            <button className="playAgain" onClick={handleReset}>Play Again?</button>
        </div>
    );
};

export default FinalScore;