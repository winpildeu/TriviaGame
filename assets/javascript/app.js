// Array of questions
const questionBank = [{
    question: "What?",
    choices: ["A", "B", "C", "D"],
    ans: 2
}];
let timer = 30;
// counter to move to the next question
let q = 0;
let timerDisplay = $("#timer");
let questionDisplay = $("#question");
let answerDisplay = $("#answers");

// Show the time left
setInterval(function() {
    timerDisplay.html(`${timer}`);
    timer--;
}, 1000);


// Show the question and answer choices
questionDisplay.html(`<h1>${questionBank[0].question}</h1>`);
for (let i = 0; i < questionBank[0].choices.length; i++) {
    answerDisplay.append($("<li>").addClass("list-group-item answer").attr("data-choice", i).text(`${questionBank[q].choices[i]}`));

}