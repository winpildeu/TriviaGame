// Array of questions
const questionBank = [{
        question: "Iceberg is a type of what vegetable?",
        choices: ["cabbage", "cauliflower", "pea", "lettuce"],
        ans: 3
    },
    {
        question: "If you were eating a Muscat or a Hanepoot what would you be eating?",
        choices: ["Peach", "Plum", "Grape", "Pear"],
        ans: 2
    },
    {
        question: "Imperial Gage and Red Gage are varieties of which fruit?",
        choices: ["Lemon", "Lime", "Peach", "Plum"],
        ans: 3
    },
    {
        question: "In which continent did Cranberries originate?",
        choices: ["Africa", "Asia", "Europe", "North America"],
        ans: 3
    },
    {
        question: "In which country did Avocados originate?",
        choices: ['Mexico', 'Brazil', 'Italy', 'Spain'],
        ans: 0
    },
    {
        question: "Jerusalem and Globe are types of which vegetable?",
        choices: ['Artichoke', 'Bean', 'Celery', 'Kale'],
        ans: 0
    },
    {
        question: "Kale is noted for its high content of what vitamin?",
        choices: ['D', 'A', 'K', 'E'],
        ans: 2
    }
];

// counter to move to the next question
let q = 0;
// counts the number of correct/ incorrect answers
let correct = 0;
let incorrect = 0;

let timeLeft;
let clear;
const timerDisplay = $("#timer");
const questionDisplay = $("#question");
const answerDisplay = $("#answers");

// ========== FUNCTIONS ==========

// Generic function for capturing the choice from the data-attribute
function displayAnswer() {
    // reset the time
    clearInterval(timeLeft);

    // log the user's answer
    let userChoice = $(this).attr("data-choice");
    console.log(`User choice: ${userChoice}`);
    let answer = questionBank[q].ans;

    $("#myAns").text(`${questionBank[q].choices[userChoice]}`);
    $("#correctAns").text(`${questionBank[q].choices[answer]}`);

    // show the answer
    $("#answer").css("display", "block");

    // Checks if the user answer and real answer match
    // if (userChoice == questionBank[q].ans) {
    //     correct++;
    //     console.log(`Correct answer: ${questionBank[q].ans}`);
    //     console.log(`Number correct: ${correct}`);    
    // } else {
    //     incorrect++;
    // }
    // ES6 way to write simple if/ else conditions
    (userChoice == questionBank[q].ans) ? correct++ : incorrect++;

    // Clears the page for the next question
    clear = setTimeout(function () {

        // empty out the divs
        $("#timer").empty();
        $("#question").empty();
        $("#answers").empty();

        // move on to the next question
        q++;
        if (q === questionBank.length) {
            // go to the results page
            $("#endGame").css("display", "inline");
            $("#correct").text(`${correct}`);
            $("#incorrect").text(`${(incorrect)}`);
        } else {
            displayQuestion();
        }
    }, 5000);

}

function displayQuestion() {
    $("#answer").css("display", "none");
    $("#endGame").css("display", "none");

    // reset the timeout
    clearTimeout(clear);

    // Show the time left
    let timer = 10;

    timeLeft = setInterval(function () {
        timer--;
        timerDisplay.html(`${timer}`);
        if (timer === 0) {
            // checkAnswer func. and show the content
            displayAnswer();
        }
    }, 1000);

    // Show the question and answer choices
    questionDisplay.html(`<h1>${questionBank[q].question}</h1>`);
    for (let i = 0; i < questionBank[0].choices.length; i++) {
        answerDisplay.append($("<button>").addClass("btn btn-warning btn-lg btn-block shadow-sm answer").attr("type", "button").attr("data-choice", i).text(`${questionBank[q].choices[i]}`));
    }
}

// =========== MAIN CODE ===========

$(function () {
    // Add an onclick to all generated elements with a class of answer
    $(document).on("click", ".answer", displayAnswer);

    // Starts the game when the button is clicked
    $("#startButton").on("click", function () {
        $("#startGame").css("display", "none");
        displayQuestion();
    });

    // Resets the game when the button is clicked
    $("#resetButton").on("click", function () {
        q = 0;
        correct = 0;
        // empty out the divs
        $("#timer").empty();
        $("#question").empty();
        $("#answers").empty();

        // clear all timeouts/ intervals
        clearInterval(timeLeft);
        clearTimeout(clear);
        displayQuestion();
    });
})