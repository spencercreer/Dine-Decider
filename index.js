// variables for question functionality
var currentQuestion = 0;
var totalQuestions = homeQuestions.length;
var startScreen = document.getElementById("start-screen");
var questionsPage = document.getElementById("questions-page");
var eatHomeBtn = document.getElementById("eat-home-btn");
var eatOutBtn = document.getElementById("eat-out-btn");
var nextButton = document.getElementById("next-button");

var questions

// variables for question values
var displayQuestion = document.getElementById("question");
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
function getQuestions(questionIndex) {
    console.log(questions);
    var runQuestions = questions[questionIndex];
    console.log(runQuestions);
    displayQuestion.textContent = runQuestions.questionText

    var choices = questions[questionIndex].choices

    choices.forEach(function (newItem) {

        let inputItem = document.createElement("input");
        let spanItem = document.createElement("label");
        let divItem = document.createElement("div");
        inputItem.type = "radio";
        inputItem.value = newItem;

        spanItem.textContent = " " + newItem;
        spanItem.setAttribute('for', newItem)
        inputItem.setAttribute('name', questions[questionIndex].questionText);
        divItem.setAttribute('class', 'block mb-1')

        document.getElementById("control").appendChild(divItem);
        divItem.appendChild(inputItem);
        divItem.appendChild(spanItem);
    })
};

// listen for which answer button is selected
var userSelection = document.querySelectorAll("input[type=radio]:checked");

// loads the next question in queue


// event listener to start the quiz
// eatHome.addEventListener("click", loadEatHomeQuestions);
// eatOut.addEventListener("click", loadEatOutQuestions);

// event listener for the "Next" button on the questions
nextButton.addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("control").innerHTML = "";
    currentQuestion++;
    getQuestions(currentQuestion, questions);
});

// Need to make the "Eat at Home" and "Eat Out" buttons load their specific question queues. Need to have them set the startScreen to "hide" and the questionsPage to "show"
eatHomeBtn.addEventListener("click", function () {
    questions = homeQuestions;
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    startScreen.setAttribute("class", "hide");
});
eatOutBtn.addEventListener("click", function () {
    questions = restaurantQuestions
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    startScreen.setAttribute("class", "hide");
});
// also need to figure out why the radio button is staying selected after clicking "Next". Maybe there is a clear type command or something.