// Declare Variables
var currentQuestion = 0;
var questions;
var totalQuestions;
var answers = [];
var grabInput;
var eatHome;
var eatOut;
var startScreen = document.getElementById("start-screen");
var searchTerm = document.getElementById("search-term");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var questionsPage = document.getElementById("questions-page");
var noResults = document.getElementById("no-results");
var resultsPage = document.getElementById("results-page")
var eatHomeBtn = document.getElementById("eat-home-btn");
var eatOutBtn = document.getElementById("eat-out-btn");
var nextButton = document.getElementById("next-button");
var previousSugEl = document.getElementById("previous-sug");
var displayQuestion = document.getElementById("question");
var costSign = ["$", "$$", "$$$", "$$$$", "$$$$$"];

// Get next question
function getQuestions(questionIndex, questions) {

    // Variables question and choices
    var runQuestions = questions[questionIndex];
    var choices = questions[questionIndex].choices
    // Display question text to questions page
    displayQuestion.textContent = runQuestions.questionText
    displayQuestion.setAttribute("class", "is-size-3");

    // Display choices to questions page
    choices.forEach(function (newItem) {

        // Create radio input and text elements for each choice
        let inputItem = document.createElement("input");
        let spanItem = document.createElement("label");
        let divItem = document.createElement("div");
        inputItem.type = "radio";
        inputItem.value = newItem;
        // Set attributes of choices elements
        spanItem.textContent = " " + newItem;
        spanItem.setAttribute('for', newItem);
        spanItem.setAttribute("class", "is-size-5");
        inputItem.setAttribute('name', questions[questionIndex].questionText);
        divItem.setAttribute('class', 'block mb-1');
        // Append elements to questions page
        document.getElementById("control").appendChild(divItem);
        divItem.appendChild(inputItem);
        divItem.appendChild(spanItem);
    })
};

// Get localStorage items and display to results page 
previousSugEl.addEventListener("click", function () {

    if(!localStorage.getItem("Responses")){
        // If no stored elements
        alert("You do have not had any previous suggestions.");
    } else{
        // Get localStorage items
        answers = JSON.parse(localStorage.getItem("Responses"));
        eatHome = JSON.parse(localStorage.getItem("EatHome"));

        // Call correct API
        if(eatHome === true){
            searchInput = localStorage.getItem("Food Query");
            callRecipeAPI();
        } else{
            searchInput = localStorage.getItem("Location");
            callRestaurantAPI();
        }
         // Show results page hide questions page
         questionsPage.setAttribute("class", "hide");
         startScreen.setAttribute("class", "hide");
         resultsPage.setAttribute("class", "show")
    }
})

// Event listener for the "Next" button on the questions
nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion++;

    // Get user selection and push to answers array
    var selectedOption = document.querySelector('input[type=radio]:checked');
    answers.push(selectedOption.value)

    if (currentQuestion < questions.length) {
        // Clear elements and call getQuestions function
        document.getElementById("control").innerHTML = "";
        getQuestions(currentQuestion, questions);
    } else {
        // Call correct API
        if (eatHome === true) {
            callRecipeAPI();
        } else {
            callRestaurantAPI();
        }
        // Store user responses to local storage
        localStorage.setItem("Responses",JSON.stringify(answers));
        localStorage.setItem("EatHome", eatHome);
        // Show results page hide questions page
        questionsPage.setAttribute("class", "hide");
        startScreen.setAttribute("class", "hide");
        resultsPage.setAttribute("class", "show")
    }

});

// Eat at home button, load home questions, hide start screen and show questions page
eatHomeBtn.addEventListener("click", function () {
    eatHome = true;
    document.getElementById("search-term-title").textContent = "Enter an ingrediant or dish?";
    startScreen.setAttribute("class", "hide");
    searchTerm.setAttribute("class", "show")
});
// Eat Out button, load restaurant questions, hide start screen and show questions page
eatOutBtn.addEventListener("click", function () {
    eatHome = false;
    document.getElementById("search-term-title").textContent = "Where are you?";
    startScreen.setAttribute("class", "hide");
    searchTerm.setAttribute("class", "show")
});

// Go button for location/food input
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    searchInput = document.querySelector('#search-input').value.trim();
    // EatHome check and store to local storage
    if(eatHome === true){
        localStorage.setItem("Food Query",searchInput);
        questions = homeQuestions;
        totalQuestions = questions.length;
    } else{
        localStorage.setItem("Location",searchInput);
        questions = restaurantQuestions;
        totalQuestions = questions.length; 
    }

    // Call getQuestions, show questions page and hide searchTerm
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    searchTerm.setAttribute("class", "hide");
});

// Get recipe data from the spoonacular API
function callRecipeAPI() {
    // spoonacular API key
    var APIkey = "b76df6aa9f3f42a2850529cba2ce87ae" //This is a second APIKey if we have too many calls
    // var APIkey = "674f6fda78664e8d8eb605383a63dc97"; 

    // User response variables
    var foodQuery = searchInput;
    var mealText = answers[0];
    var meal = answers[0].replace(/\s+/g,'');
    var cuisine = answers[1];
    var diet = answers[2].replace(/\s+/g,'');

    // Set API URL key based on diet
    if(diet === "No,IeatwhateverIwant"){
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + foodQuery + "&type=" + meal + "&cuisine=" + cuisine + "&number=6&addRecipeInformation=true&addRecipeNutrition=true&apiKey=" + APIkey;
    } else {
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + foodQuery + "&type=" + meal + "&cuisine=" + cuisine + "&diet=" + diet +"&number=6&addRecipeInformation=true&addRecipeNutrition=true&apiKey=" + APIkey;
    }

    // AJAX call spoonacular API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        if(response.results.length === 0){
            // If no response, display message to user
            document.getElementById("no-result").textContent = "We do not have any suggestions based on your responses. Try again with slightly different answers.";
        } else{
            // Display recipe API response to results page
            document.getElementById("menu").textContent = mealText + " Menu";
            for(let i = 0; i < response.results.length; i++){
                // API response variables
                var recipeTitle = response.results[i].title;
                var recipeImage = response.results[i].image;
                var calories = response.results[i].nutrition.nutrients[0].amount;
                var carbs = response.results[i].nutrition.nutrients[3].amount;
                var protein = response.results[i].nutrition.nutrients[8].amount;
                var fat = response.results[i].nutrition.nutrients[1].amount;
                var time = response.results[i].readyInMinutes;
                var servings = response.results[i].servings;
                var recipeURL = response.results[i].sourceUrl;
                // Append recipe API responses as cards to results page
               $("#result-suggestions").append(`
               <div class="column is-one-third"
                   <div class="card is-centered">
                       <div class="card-header">
                       <h1 class="card-header-title is-size-4" id="result-title-${i}">${recipeTitle}</h1>
                       </div>
                       <div class="card-image" style="background-color:lightgrey;">
                           <figure class="image result-image-${i}">
                               <img src="${recipeImage}" alt="${recipeTitle} image">
                           </figure>
                        </div>
                       <div class="card-content">
                       <ul class="resultList">
                           <li id="restLocation-${i}">Calories: ${calories} cal</li>
                           <li id="restCuisine-${i}">Carbs: ${carbs} g</li>
                           <li id="restCost-${i}">Protein: ${protein} g</li>
                           <li id="restReview-${i}" class="mb-2">Fat: ${fat} g</li>
                           <li id="restReview-${i}">Total Time: ${time} minutes</li>
                           <li id="restReview-${i}" class="mb-2">Sevings: ${servings}</li>
                           <li>Recipe Link: <a id="restURL-${i}" href="${recipeURL}" target="_blank">${recipeTitle}</a></li>
                       </ul>
                       </div>
                   </div>
               </div>
           `);
           }
        }
    })
}

// Get restaurant data from the Zomato API
function callRestaurantAPI() {

    // Set user response variables
    var meal = answers[0];
    var cuisineId = 0;
    var cuisineAnswer = answers[1];
    switch (cuisineAnswer) {
        case "American":
            cuisineId = 1;
            break;
        case "Italian":
            cuisineId = 55;
            break;
        case "Mexican":
            cuisineId = 73;
            break;
        case "Asian":
            cuisineId = 3;
            break;
        case "Bar Food":
            cuisineId = 227;
            break;
        default:
            break;
    }
    var alcohol = answers[2];
    var takeOut = answers[3];

    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + searchInput;

    // AJAX call Zomato API
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": "0494ac0d19d3768669eba3cb4cc8a747",
            "content-type": "application/json",
        }
    }).then(function (cityInfo) {

        
        var latitude = cityInfo.location_suggestions[0].latitude;
        var longitude = cityInfo.location_suggestions[0].longitude;

        var restURL2 = "https://developers.zomato.com/api/v2.1/search?lat=" + latitude + "&lon=" + longitude + "&cuisines=" + cuisineId;

        // Second AJAX call Zomato API based on lat and lon
        $.ajax({
            url: restURL2,
            method: "GET",
            headers: {
                "user-key": "0494ac0d19d3768669eba3cb4cc8a747",
                "content-type": "application/json",
            }
        }).then(function (restaurantAPI2) {

            for (let i = 0; i < restaurantAPI2.restaurants.length; i++) {
                // API response variables
                var highlights = restaurantAPI2.restaurants[i].restaurant.highlights;
                var restName = restaurantAPI2.restaurants[i].restaurant.name;
                var urlLink = restaurantAPI2.restaurants[i].restaurant.url;
                var restRating = restaurantAPI2.restaurants[i].restaurant.user_rating.aggregate_rating
                var restLocate = restaurantAPI2.restaurants[i].restaurant.location.address
                var priceRange = restaurantAPI2.restaurants[i].restaurant.price_range;
                
                if (meal && alcohol === "Yes" && takeOut === "Takeout") {
                    if (highlights.includes(meal) && (highlights.includes("Serves Alcohol")) && (highlights.includes("Takeaway Available"))) {
                    }
                } else if (meal && alcohol === "Yes" && takeOut === "Dine-In") {
                    if (highlights.includes(meal) && (highlights.includes("Serves Alcohol"))) {
                    }
                } else if (meal && alcohol === "No" && takeOut === "Takeout") {
                    if (highlights.includes(meal) && (highlights.includes("Takeaway Available"))) {
                    }
                } else if (meal && alcohol === "No" && takeOut === "Dine-In") {
                    if (highlights.includes(meal)) {
                    }
                }
                document.getElementById("menu").textContent = searchInput + " Restaurants";
                // Append restaraunt API responses as cards to results page
                $("#result-suggestions").append(`
                        <div class="column is-one-third"
                            <div class="card is-centered">
                                <div class="card-header">
                                <h1 class="card-header-title is-size-4" id="result-title-${i}">${restName}</h1>
                                </div>
                                <div class="card-content">
                                <ul class="resultList">
                                    <li id="restLocation-${i}">Location: ${restLocate}</li>
                                    <li id="restCuisine-${i}">Cuisine: ${cuisineAnswer}</li>
                                    <li id="restCost-${i}">Price: ${costSign[priceRange-1]}</li>
                                    <li id="restReview-${i}">Review: ${restRating}</li>
                                    <li>
                                        <a id="restURL-${i}" href="${urlLink}" target="_blank">${restName} on Zomato</a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    `);
            }
        })
    })
}