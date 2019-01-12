//arrays
var questions = [
    {
        question: "Which of the following languages is more suited to a structured program?",
        options: ["PASCAL", "PL/1", "FORTRAN", "BASIC"],
        answer: "PASCAL"
    },
    {
        question: "A computer assisted method for the recording and analyzing of existing or hypothetical systems is",
        options: ["Data flow", "Data capture", "Data processing", "Data transmission"],
        answer: "Data flow"
    },
    {
        question: "Which of the following computer language is used for artificial intelligence?",
        options: ["PROLOG", "COBOL", "FORTRAN", "C"],
        answer: "PROLOG"
    },
    {
        question: "Which of the following is the 1's complement of 10?",
        options: ["01", "110", "11", "10"],
        answer: "01"
    },
    {
        question: "The binary system uses powers of",
        options: ["2", "10", "8", "16"],
        answer: "2"
    },
    {
        question: "A computer program that converts assembly language to machine language is?",
        options: ["Assembler", "Compiler", "Interpreter", "Comparator"],
        answer: "Assembler"
    },
    {
        question: "The time required for the fetching and execution of one simple machine instruction is?",
        options: ["CPU cycle", "Delay time", "Real time", "Seek time"],
        answer: "CPU cycle"
    },
    {
        question: "Binary numbers need more places for counting because?",
        options: ["Binary base is small", "They are always big numbers", "Any no. of 0's can be added in front of them", "They are always big numbers"],
        answer: "Binary base is small"
    },
    {
        question: "A single packet on a data link is known as?",
        options: ["Frame", "Path", "Block", "Group"],
        answer: "Frame"
    },
    {
        question: "The examination and changing of single bits or small groups of his within a word is called?",
        options: ["Bit manipulation", "Bit", "Byte", "Bit slice"],
        answer: "Bit manipulation"
    }
];
//objects
var results = {

}

//global variables
var questionsElement = $("#questions");
var play = $("#play");
var timerElement = $("#timer");
var timer = 30
var timerInterval;
var questionNumber = 0;

var correct = 0;
var wrong = 0;
var unanswered = 0;
var value;

//functions
function startGame(){
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionNumber = 0;
    displayQuestion();
    play.hide();
}

play.on('click', function(){
startGame();
});


function displayQuestion(){
    clearInterval(timerInterval)
        if(questionNumber < questions.length){
            timer=30;
            timerInterval = setInterval(function(){ 
                if(timer > 1){ 
                    timer-- 
                    timerElement.html("Time Remaining: " + timer);
                } else{ 
                    // alert("time out")
                    displayQuestion()
                } 
            }
            , 1000)
            timerElement.html("Time Remaining: " + timer);
            questionsElement.empty();
            questionsElement.append(`${questionNumber}/10`);
            questionsElement.append(`<div class="card">${questions[questionNumber].question}</div>`);
            for (var j=0; j< questions[questionNumber].options.length; j++){
                questionsElement.append(
                    `<div number=${questionNumber + 1} 
                    data-value="${questions[questionNumber].options[j]}"
                    answer="${questions[questionNumber].answer}"
                    name=${questions[questionNumber].question}
                    class="options"><div id="optionsDiv">${questions[questionNumber].options[j]}</div></div>`);
            }
            questionNumber++;
            value = $(this).attr('data-value');
            results[questionNumber] = value;
            console.log(results);

        console.log(`${questionNumber}: Correct: ${correct} Incorrect: ${wrong} Unanswered: ${unanswered}`);

        }else {
            // alert('game over')
            endGame()
            //why does show need to be here??
            play.show(); 
        }
}

$(document).on('click', '.options', function(){
    value = $(this).attr('data-value');
    var answer = $(this).attr('answer')
    var questionNumber = $(this).attr('number');
    // alert(questionNumber + value);
    results[questionNumber] = value;
    // You want to check if the option is true or false or correct incorrect
    // Display that and clear interval
    console.log(value);
    console.log(answer);
    if (value===answer){
        // console.log(value + " " + answer);
        correct++;
        timerElement.html("");
        questionsElement.html('<div>Correct! :)</div>')
        clearInterval(timerInterval);
        setTimeout(function(){
            displayQuestion();
        }, 5000)
        console.log(results);
    } else {
        // console.log(value + " " + answer);
        wrong++;
        timerElement.html("");
        questionsElement.html('<div>Incorrect! :(</div>')
        clearInterval(timerInterval);
        setTimeout(function(){
            displayQuestion();
        }, 5000)
        console.log(results);
    } 
})

 function endGame(){
    console.log("In end game ");
    // for (var i=0; i<results.length; i++){
    //     if (value=undefined){
    //         unanswered++;
    //         console.log("In if");
    //     } else {
    //         console.log("In else");
    //     }
    // }

    // console.log(unanswered);

    unanswered = 10 - (correct + wrong);
    timerElement.html("");
    // play.show(); -- why doesnt this work here????
    play.text("Try Again?");
    // for (var i=0; i<questions.length; i++){
    //     if (questions[i].answer === results[i+1]){
    //         correct++;
    //     }
    //     else if (questions[i].answer != results[i+1]){
    //         wrong++;
    //     }
    //     else {
    //         unanswered++;
    //     }
    // }
    clearInterval(timerInterval);
    // console.log(correct);
    // console.log(wrong);
    $('#questions').html(`<div id="questionCorrect">Correct:  ${correct}</div>
                        <div id="questionWorng">Incorrect: ${wrong}</div>
                        <div>Unanswered: ${unanswered}</div>`);
   
}


