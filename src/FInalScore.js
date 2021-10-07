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
        setCurrentPage(4);
    }

    //this function checks our current array of high scores, pushes the new high score to the database, and then deletes the lowest high score if there are already ten high score entries. This causes our database subscription to resend our updated high score value. This value is passed into orderDatabase() which saves an updated highScoreArray.
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

    //only makes highScoreSubmit form visible if submit hasn't been clicked yet. Also, the form is only visible if there are either less than 10 high scores or if the userScore is higher than the lowest score on the list
    const submitAllowed = (highScoreArray.length < 10 || score > highScoreArray[highScoreArray.length - 1].userScore) && !submitted;

    return(
        <div className="finalScoreContainer wrapper">  
            <p>You scored {score} out of {quizLength} questions.</p>
            {
                submitAllowed?
            (<form 
                className="highScoreSubmit" 
                onSubmit={(event) => {checkHighScore(event, score, highScoreArray)}}
            >
                <label htmlFor="changeScore">New high score! Please enter your name:</label>
                <input 
                    type="text" 
                    id="changeScore"
                    value={name}
                    maxLength="7"
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Submit High Score</button>
            </form>):
            ""
            }

            {
                //show high score only if the user has submitted high score or there is no option to submit/ no new high score
                submitted || !submitAllowed?
                <button className="viewHighScore" onClick={handleHighScore}>See High Score</button>:
                ""
            }
            <button className="playAgain" onClick={handleReset}>Play Again?</button>
        </div>
    );
};

export default FinalScore;