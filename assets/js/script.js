var startButton = document.querySelector(".startButton");
var quizPage = document.querySelector("#quizPage");
var checkline = document.querySelector("#checkline");
var submitBtn = document.querySelector("submitBtn");
var finalScore = document.querySelector("#finalScore");
var userInitial = document.querySelector("#initial");
var highScorePage = document.querySelector("#highScorePage");
var scoreRecord = document.querySelector("#scoreRecord");
var reactButtons = document.querySelector(".reactButtons")
var backButton = document.querySelector("#backButton");
var clearButton = document.querySelector("#clearButton");

var questionIndex;

var questions = [
    {
        question: "Do you wanna build a snowman?",
        choices: [
            "Go away, Anna!",
            "Sure, Elsa!",
        ],
        answer: 0,
    },
    {
        question: "Which pill did Neo choose?",
        choices: [
            "The Blue Pill",
            "The Red Pill",
        ],
        answer: 1,
    },
    {
        question: "Who let the dogs out?",
        choices: [
            "Baha Men",
            "Patti Page",
        ],
        answer: 0,
    }
]

function loadQuestion() {
    var quiz = questions[questionIndex];
    $("#quizPage").children("section").children("h1").text(quiz.question);
    $("#quizPage").children("section").children(".answers").children().eq(0).text(quiz.choices[0]);
    $("#quizPage").children("section").children(".answers").children().eq(1).text(quiz.choices[1]);
};

//when I answer a question, show if answer is correct or wrong
function checkAnswer(event) {
    event.preventDefault();
    //make it display
    checkline.style.display = "block";
    setTimeout(function () {
        checkline.style.display = "none";
        //I am presented with another question
        if (questions < quiz.length -1) {
            loadQuestion(questions + 1);
        }
        else {
            gameOver();
        }
        questionCount++;
    }, 3000);

    //answer check
    if (questions[quiz].answer == event.target.value) {
        checkline.textContent = "Correct!";
        totalScore = totalScore + 1;
    }
    else {
        secondsLeft = secondsLeft - 10;
        checkline.textContent = "Wrong!";
    }
}

//when all questions are answered or the timer reaches 0, Game is over
function gameOver() {
    quizPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    //show final score
    finalScore.textContent = "Final score:" + totalScore;
    // clearInterval(timerInterval);
    timeleft.style.display = "none";
};

//render score to the score board
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();
    //Slice the high score array to only show the top five high scores.
    var topFive = highScores.slice(0,10);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        // Show the score list on scoreboard
        var li = document.createElement("li");
        li.textContent = item.user + item.score;
        li.setAttribute("data-index",i);
        scoreRecord.appendChild(li);
    }
};

//sort score and ranking the highscore list
function sort () {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    } 
    else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }
};

//push new score and initial to the local storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedlist));
};

function saveScore () {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore,
    }
    addItem(scoreItem);
    renderScore();
};

startButton.addEventListener("click", function() {
    document.querySelector("#quizPage").setAttribute("class", "");
    document.querySelector("#startPage").setAttribute("class", "hide");
    questionIndex = 0;
    loadQuestion();
});

//click any choices button, go to the next question
reactButtons.forEach(function(click) {
    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display = "none"
    saveScore();
});

//check highscore ranking list
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    quizPage.style.display = "none"
    renderScore();  
});

//go back to main page
backButton.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    quizPage.style.display = "none";
    location.reload();
});

//clear local storage and clear page shows
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
})