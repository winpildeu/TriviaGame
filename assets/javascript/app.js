// Array of questions
const questionBank = [{
        question: "What fruit do I like?",
        choices: ["Apple", "Banana", "Cantelope", "Don't know"],
        ans: 2
    },
    {
        question: "What WHAT?",
        choices: ["E", "F", "G", "H"],
        ans: 2
    }
];

// counter to move to the next question
let q = 0;
let correct = 0;

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
    $("#myAns").text(`${userChoice}`);
    $("#correctAns").text(`${questionBank[q].ans}`);

    // show the answer
    $("#answer").css("display", "block");

    checkAnswer(userChoice);
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
        } else {
            displayQuestion();
        }
    }, 5000);

}

function displayQuestion() {
    $("#answer").css("display", "none");
    $("#endGame").css("display", "none");
    // Show the time left
    let timer = 10;

    timeLeft = setInterval(function () {
        timer--;
        timerDisplay.html(`${timer}`);
        if (timer === 0) {
            // checkAnswer func. and show the content
            // displayAnswer();
        }
    }, 1000);

    // Show the question and answer choices
    questionDisplay.html(`<h1>${questionBank[0].question}</h1>`);
    for (let i = 0; i < questionBank[0].choices.length; i++) {
        answerDisplay.append($("<button>").addClass("btn btn-warning btn-lg btn-block answer").attr("type", "button").attr("data-choice", i).text(`${questionBank[q].choices[i]}`));
    }
}

function checkAnswer(userAnswer) {
    if (userAnswer === questionBank[q].ans) {
        correct++;
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
    $("#resetButton").on("click", function() {
        q = 0;
        displayQuestion();
    });
})