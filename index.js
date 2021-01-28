// variables for question functionality
var currentQuestion = 0;
var questions;
var totalQuestions;
var startScreen = document.getElementById("start-screen");
var questionsPage = document.getElementById("questions-page");
var eatHomeBtn = document.getElementById("eat-home-btn");
var eatOutBtn = document.getElementById("eat-out-btn");
var nextButton = document.getElementById("next-button");

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
function getQuestions(questionIndex,questions) {
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

// event listener for the "Next" button on the questions
nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion++;
    console.log(currentQuestion);
    if(currentQuestion<questions.length){
        document.getElementById("control").innerHTML = "";
        getQuestions(currentQuestion, questions);
    } else{
        // Hide questionsPage and show resultsPage

        // call recipeAPI
        callRecipeAPI();
    }

});

// Need to make the "Eat at Home" and "Eat Out" buttons load their specific question queues. Need to have them set the startScreen to "hide" and the questionsPage to "show"
eatHomeBtn.addEventListener("click", function () {
    questions = homeQuestions;
    totalQuestions = questions.length;
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    startScreen.setAttribute("class", "hide");
});
eatOutBtn.addEventListener("click", function () {
    questions = restaurantQuestions;
    totalQuestions = questions.length;
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    startScreen.setAttribute("class", "hide");
});

// Gets recipe data from the spoonacular API
function callRecipeAPI(){
    // These variables will need to change based on the user's response but for now I hard coded them in
    var query = "Chicken";
    var cuisine = "American";
    var diet = "";
  
    // spoonacular URL
    var APIkey = "b76df6aa9f3f42a2850529cba2ce87ae";
    // This is a second APIKey if we have too many calls var APIkey = "674f6fda78664e8d8eb605383a63dc97";
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + query + "&cuisine=" + cuisine + "&diet=" + diet + "&number=1&addRecipeInformation=true&addRecipeNutrition=true&apiKey=" + APIkey;
  
    // AJAX call spoonacular API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
  
        // Log the queryURL and response
        console.log(queryURL);
        console.log(response);

        // Below is an example of displaying to the results page. It will need to be modified according to our results page
  
        // $(".recipe-title1").text(response.results[0].title);
        // $(".recipe-image1").attr("src",response.results[0].image);
        // $(".cook-time1").text("Time: " + response.results[0].readyInMinutes + " minutes");
        // $(".servings1").text("Servings: " + response.results[0].servings);
        // $(".calories1").text("Calories: " + response.results[0].nutrition.nutrients[0].amount + " cal");
        // $(".carbs1").text("Carbohydrates: " + response.results[0].nutrition.nutrients[3].amount + " g");
        // $(".protein1").text("Protein: " + response.results[0].nutrition.nutrients[8].amount + " g");
        // $(".fat1").text("Fat: " + response.results[0].nutrition.nutrients[1].amount + " g");
        // $(".recipe-url1").text("Recipe Link")
        // $(".recipe-url1").attr("href",response.results[0].sourceUrl)
        // var recipeId = response.results[0].id;
        })
}