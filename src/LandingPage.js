import {useState} from 'react';

function LandingPage({setupQuiz, setupPage}) {
    const [number, setNumber] = useState("10");
    const [category, setCategory] = useState("all");
    const [difficulty, setDifficulty] = useState("all");
    const [type, setType] = useState("all");

    function handleSubmit(event) {
        event.preventDefault();

        const url = new URL('https://opentdb.com/api.php');
    
        const searchObj = {
            amount: number
        };

        if (category !== "all") {
            searchObj.category = category;
        }

        if (difficulty !== "all") {
            searchObj.difficulty = difficulty;
        }

        if (type !== "all") {
            searchObj.type = type;
        }

        url.search = new URLSearchParams(searchObj);

        fetch(url)
        .then(res => res.json())
        .then(jsonRes => {
            if (jsonRes.results.length !== 0) {
                setupQuiz(jsonRes.results);
                setupPage(2);
            } else {
                alert('There were no results for that search.');
            }
            
        });
    };

    return(
        <>
            <div className="wrapper">
                <form className="landingForm" onSubmit={handleSubmit}>
                    <div className="landingContainer questionNumber">
                        <label htmlFor="numberOfQuestions">Number of questions: </label>
                        <input 
                            id="numberOfQuestions" 
                            type="number" 
                            min="1" 
                            max="50" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)}/>
                    </div>

                    <div className="landingContainer questionCategory">
                        <label htmlFor="questionCategory">Question Category: </label>
                        <select 
                            name="questionCategory" 
                            id="questionCategory"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </select>
                    </div>

                    <div className="landingContainer questionDifficulty">
                        <label htmlFor="questionDifficulty">Question Difficulty: </label>
                        <select 
                            name="questionDifficulty" 
                            id="questionDifficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="landingContainer questionType">
                        <label htmlFor="questionType">Question Type: </label>
                        <select 
                            name="questionType" 
                            id="questionType"
                            value={type}
                            onChange={(e) => setType(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="multiple">Multiple Choice</option>
                            <option value="boolean">True/False</option>
                        </select>
                    </div>


                    <button type="submit">Start Quiz</button>
                </form>
            </div>
        </>
    );
};

export default LandingPage;