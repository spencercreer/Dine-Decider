// variables for question functionality
var currentQuestion = 0;
var questions;
var totalQuestions;
var answers = [];
var grabInput;
var startScreen = document.getElementById("start-screen");
var searchTerm = document.getElementById("search-term");
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var questionsPage = document.getElementById("questions-page");
var noResults = document.getElementById("no-results");
var eatHomeBtn = document.getElementById("eat-home-btn");
var eatHome;
var eatOut;
var eatOutBtn = document.getElementById("eat-out-btn");
var nextButton = document.getElementById("next-button");


// variables for question values
var displayQuestion = document.getElementById("question");

// cycle through the questions
function getQuestions(questionIndex, questions) {
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


// event listener for the "Next" button on the questions
nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion++;
    var selectedOption = document.querySelector('input[type=radio]:checked');
    answers.push(selectedOption.value)
    console.log(answers);
    if (currentQuestion < questions.length) {
        document.getElementById("control").innerHTML = "";
        getQuestions(currentQuestion, questions);
    } else {
        if (eatHome === true) {
            callRecipeAPI();
        } else if (eatOut === true) {
            callRestaurantAPI();
        }
        // Hide questionsPage and show resultsPage

        // call recipeAPI
    }

});

// Eat at home button, load home questions, hide start screen and show questions page
eatHomeBtn.addEventListener("click", function () {
    eatHome = true;
    questions = homeQuestions;
    totalQuestions = questions.length;
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    startScreen.setAttribute("class", "hide");
});
// Eat Out button, load restaurant questions, hide start screen and show questions page
eatOutBtn.addEventListener("click", function () {
    eatOut = true;

    startScreen.setAttribute("class", "hide");
    searchTerm.setAttribute("class", "show")
});

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(searchBtn);
    searchInput = document.querySelector('#search-input').value.trim()
    console.log(searchInput);
    questions = restaurantQuestions;
    totalQuestions = questions.length;
    getQuestions(currentQuestion, questions);
    questionsPage.setAttribute("class", "show");
    searchTerm.setAttribute("class", "hide");
});

// Gets recipe data from the spoonacular API
function callRecipeAPI() {
    // These variables will need to change based on the user's response but for now I hard coded them in
    var meal = answers[0];
    // var meal = "chicken";
    var cuisine = answers[1];
    var dessert = answers[2];
    var diet = answers[3];
    var alcohol = answers[4];
    var cookingTools = answers[5];
    // console.log(meal);
    // console.log(cuisine);
    // console.log(dessert);
    // console.log(diet);
    // console.log(alcohol);
    // console.log(cookingTools);

    // spoonacular URL
    // var APIkey = "b76df6aa9f3f42a2850529cba2ce87ae";
    var APIkey = "674f6fda78664e8d8eb605383a63dc97"; //This is a second APIKey if we have too many calls
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + meal + "&cuisine=" + cuisine + "&number=1&addRecipeInformation=true&addRecipeNutrition=true&apiKey=" + APIkey;

    // AJAX call spoonacular API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

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

function callRestaurantAPI() {
    console.log("hello");

    var meal = answers[0];
    // var meal = "chicken";
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
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": "0494ac0d19d3768669eba3cb4cc8a747",
            "content-type": "application/json",
        }
    }).then(function (cityInfo) {

        var cityId = cityInfo.location_suggestions[0].entity_id;
        var cityType = cityInfo.location_suggestions[0].entity_type;


        var latitude = cityInfo.location_suggestions[0].latitude;
        var longitude = cityInfo.location_suggestions[0].longitude;


        var restURL2 = "https://developers.zomato.com/api/v2.1/search?lat=" + latitude + "&lon=" + longitude + "&cuisines=" + cuisineId;

        $.ajax({
            url: restURL2,
            method: "GET",
            headers: {
                "user-key": "0494ac0d19d3768669eba3cb4cc8a747",
                "content-type": "application/json",
            }
        }).then(function (restaurantAPI2) {
            console.log(restURL2);
            console.log(restaurantAPI2);

            for (let i = 0; i < restaurantAPI2.restaurants.length; i++) {
                var highlights = restaurantAPI2.restaurants[i].restaurant.highlights;
                var restName = restaurantAPI2.restaurants[i].restaurant.name;
                var urlLink = restaurantAPI2.restaurants[i].restaurant.url;

                if (meal && alcohol === "Yes" && takeOut === "Takeout") {
                    if (highlights.includes(meal) && (highlights.includes("Serves Alcohol")) && (highlights.includes("Takeaway Available"))) {
                        console.log(restName, highlights);
                    }
                }else if (meal && alcohol === "Yes" && takeOut === "Dine-In") {
                    if (highlights.includes(meal) && (highlights.includes("Serves Alcohol"))) {
                        console.log(restName, highlights);
                    }
                }else if (meal && alcohol === "No" && takeOut === "Takeout") {
                    if (highlights.includes(meal) && (highlights.includes("Takeaway Available"))) {
                        console.log(restName, highlights);
                    }
                }else if (meal && alcohol === "No" && takeOut === "Dine-In") {
                    if (highlights.includes(meal)) {
                        console.log(restName, highlights);
                    }
                // }else if (meal && alcohol === "Yes") {
                //     if (highlights.includes(meal) && (highlights.includes("Serves Alcohol"))) {
                //         console.log(restName, highlights);
                //     }
                }else if (highlights.includes(meal) && (highlights.includes("Serves Alcohol")) && (highlights.includes("Takeaway Available"))) {
                    
                    // alert("this is working");
                    // noResults.setAttribute("class", "is-active");
                    // console.log(restName, highlights);
                    console.log("There are no results");
                }
                // if(alcohol === "Yes") {
                //     if(highlights.includes("Serves Alcohol")) {
                //         console.log(highlights);
                //     }
                // }


                // console.log(restaurantAPI2.restaurants[i].restaurant.name)


            }
        })


    })

    // })
}