// variables for question functionality
var currentQuestion = 0;
var totalQuestions = questions.length;
var startScreen = document.getElementById("start-screen");
var questionsPage = document.getElementById("questions-page");
var eatHome = document.getElementById("eat-home");
var eatOut = document.getElementById("eat-out");
var nextButton = document.getElementById("next-button");

// variables for question values
var displayQuestion = document.getElementById("question");
var ans1 = document.getElementById("ans1");
var ans2 = document.getElementById("ans2");
var ans3 = document.getElementById("ans3");
var ans4 = document.getElementById("ans4");



// displays the questions for eating at home
// function loadEatHomeQuesions() {
//     startScreen.setAttribute("class", "hide");
//     questionsPage.setAttribute("class", "show")
// };

// displays the questions for eating out
// function loadEatOutQuesions() {
//     startScreen.setAttribute("class", "hide");
//     questionsPage.setAttribute("class", "show")
// };

// cycle through the questions
function startQuestions(questionIndex) {
    var runQuestions = questions[questionIndex];
    console.log(runQuestions);
    displayQuestion.textContent = runQuestions.question;
    console.log(displayQuestion);
    ans1.textContent = " " + runQuestions.option1;
    ans2.textContent = " " + runQuestions.option2;
    ans3.textContent = " " + runQuestions.option3;
    ans4.textContent = " " + runQuestions.option4;
};

// listen for which answer button is selected
var userSelection = document.querySelectorAll("input[type=radio]:checked");


// loads the next question in queue
function loadNextQuestion() {
    startQuestions(currentQuestion);
}
        
loadNextQuestion();

// event listener to start the quiz
// eatHome.addEventListener("click", loadEatHomeQuestions);
// eatOut.addEventListener("click", loadEatOutQuestions);

// event listener for the "Next" button on the questions
nextButton.addEventListener("click", function(event) {
    event.preventDefault();

    currentQuestion++;
    loadNextQuestion();
});

// Need to make the "Eat at Home" and "Eat Out" buttons load their specific question queues. Need to have them set the startScreen to "hide" and the questionsPage to "show"

// also need to figure out why the radio button is staying selected after clicking "Next". Maybe there is a clear type command or something. 