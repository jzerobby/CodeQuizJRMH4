var start_btn = document.querySelector(".start_btn");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".quit");
var continue_btn = info_box.querySelector(".restart");
var quiz_box = document.querySelector(".quiz_box");
var option_list = document.querySelector(".option_list");
var timeCount = quiz_box.querySelector(".timer_sec");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(60);
}

var questions = [
    {
        numb: 1,
        question: "What's next to this song? - Do you wanna build a snowman?",
        answer: "Go away, Anna!",
        options: [
            "Go away, Anna!",
            "Sure, Elsa!",
        ]
    },
    {
        numb: 2,
        question: "Which pill did Neo choose?",
        answer: "The Red Pill",
        options: [
            "The Blue Pill",
            "The Red Pill",
        ]
    },
    {
        numb: 3,
        question: "Who sang the song - Who let the dogs out?",
        answer: "Baha Men",
        options: [
            "Baha Men",
            "Patti Page",
        ]
    },
    {
        numb: 4,
        question: "Who won the Squid Game?",
        answer: "Seong Gi-hun",
        options: [
            "The Avengers",
            "Seong Gi-hun",
        ]
    },
    {
        numb: 5,
        question: "Which one is hotter than the Sun?",
        answer: "Lightning",
        options: [
            "Lightning",
            "Magma",
        ]
    },
];

var que_count = 0;
var que_numb = 1;
var counter;
var timeValue = 60;
var userScore = 0;

var next_btn = quiz_box.querySelector(".next_btn");
var result_box = document.querySelector(".result_box");
var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    info_box.classList.add("activeInfo");
    result_box.classList.remove("activeResult");
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

next_btn.onclick = ()=>{
    if(que_count < questions.length -1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none";
    }else{
        console.log("Questions Completed");
        showResultBox();
    }
}

function showQuestions(i){
    var que_text = document.querySelector(".que_text");
    var que_tag = '<span>'+ questions[i].numb + ". " + questions[i].question +'</span>';
    var option_tag = '<div class="option">' + questions[i].options[0] + '<span></span></div>' + '<div class="option">' + questions[i].options[1] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    var option = option_list.querySelectorAll(".option");
    for (var i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

var tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>';
var crossIcon = '<div class="icon cross"><i class="fa fa-times"></i></div>';

function optionSelected(answer){
    var userAns = answer.textContent;
    var correctAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    if (userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeEnd", tickIcon);
    }else{
        answer.classList.add("wrong");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeEnd", crossIcon);
        var minusTen = timeCount.textContent;
        timeCount.textContent = minusTen -"10";

        for (var i = 0; i < allOptions; i++) {
           if(option_list.children[i].textContent == correctAns){
               option_list.children[i].setAttribute("class", "option correct");
               option_list.children[i].insertAdjacentHTML("beforeEnd", tickIcon);
           }
        }
    }

    for (var i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    var scoreTag = '<span>Your Score:<p>'+ userScore +'</p><p>out of</p><p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
    var initialScore = result_box.querySelector(".initial_score");
    var scoreBoard = ' <span><p>Last Player:</p><p>Initials:</p><p>Score: '+ userScore +'</p></span>';
    initialScore.innerHTML = scoreBoard;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time <9){
            var addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function queCounter(i){
    var total_que = quiz_box.querySelector(".total_que");
    var total_que_tag = '<span><p>'+ i +'</p><p>Of</p><p>'+ questions.length +'</p>Questions</span>';
    total_que.innerHTML = total_que_tag;
}

var testButton = document.getElementById("saveData");

function saveData(event) {
    event.preventDefault();
    console.log("Hello");
}

var saveInitials = document.getElementById("#saveInitials");
var storedValue = localStorage.getItem("gamer");

testButton.addEventListener("click", saveData);