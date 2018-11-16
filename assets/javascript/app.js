// Array of questions
const questionBank = [{
        question: "What?",
        choices: ["A", "B", "C", "D"],
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

let timeLeft;
let timerDisplay = $("#timer");
let questionDisplay = $("#question");
let answerDisplay = $("#answers");

// ========== FUNCTIONS ==========

// Generic function for capturing the choice from the data-attribute
function displayAnswer() {
    // reset the time
    clearTimeout(timeLeft);

    // empty out the divs
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();

    // log the user's answer
    let userChoice = $(this).attr("data-choice");
    console.log(`User choice: ${userChoice}`);

    // move on to the next question
    q++;
    if (q === questionBank.length) {
        // go to the results page
        alert(`TIME'S UP!`);
    }
    displayQuestion();
}

function displayQuestion() {
    // Show the time left
    let timer = 30;

    timeLeft = setInterval(function () {
        timer--;
        timerDisplay.html(`${timer}`);
        if (timer === 0) {
            displayAnswer();
            // checkAnswer func. and show the content
        }
    }, 1000);

    // Show the question and answer choices
    questionDisplay.html(`<h1>${questionBank[0].question}</h1>`);
    for (let i = 0; i < questionBank[0].choices.length; i++) {
        answerDisplay.append($("<li>").addClass("list-group-item answer show").attr("data-choice", i).text(`${questionBank[q].choices[i]}`));
    }
}

// Add an onclick to all generated elements with a class of answer
$(document).on("click", ".answer", displayAnswer);

// onclick start button to do quiz
displayQuestion();