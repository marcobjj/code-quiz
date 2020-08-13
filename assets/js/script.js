var quizList = document.querySelector("#list");
var quizQuestion = document.querySelector("#question");
var quizResult = document.querySelector("#result");
var finalScore = document.querySelector("#final-score");
var submitScore = document.querySelector("#submit-score");
var userScore = document.querySelector("#user-scores");
var timeDisplay = document.querySelector("#time-display");
var viewHighScores = document.querySelector("#view-scores");
var startBtn = document.querySelector("#start-button");




var questionObject1 = {};
questionObject1.question = "Arrays in Javascript can be used to store _______.";
questionObject1.choices = ["Numbers, Strings", "Other Arrays","Boolean", "All of the Above"];
questionObject1.answer = 3;

var questionObject2 = {};
questionObject2.question = "Commonly used data types do NOT Include:";
questionObject2.choices = ["Alert", "Strings", "Boolean", "Numbers"];
questionObject2.answer = 0;

var questionObject3 = {};
questionObject3.question = "The condition in and if/else statement is enclosed with:";
questionObject3.choices = ["Curly brackets", "Brackets","Comma", "Parenthesis"];
questionObject3.answer = 3;

var questionObject4 = {};
questionObject4.question = "A very useful tool during development and debugging for printing out content to the debugger is:";
questionObject4.choices = ["Terminal bash", "Javascript","Console.log", "For loops"];
questionObject4.answer = 2;

var questionObject5 = {};
questionObject5.question = "String values must be enclosed with _______ when being associated with variables.";
questionObject5.choices = ["Brackets", "Quotes","Parenthesis", "Slashes"];
questionObject5.answer = 1;


var quizArray = [questionObject1, questionObject2, questionObject3,questionObject4,questionObject5];

var currentQuestion = 0;
var correctAnswer = 0;
var totalTime = 0;
var totalScore = 0;

var timeCount ;


var startQuiz = function (){

currentQuestion = 0;

reset();
addQuestion();
clearTimeAndScore();

changeSlide("quiz");

}

var clearTimeAndScore = function ()
{

   
    totalTime = 75000;
    timeCount = setInterval(intervalHandler,1000);

}

var reset = function(){

   if( quizList.hasChildNodes()  ) quizList.textContent = '';

  


}

var addQuestion = function() {

    var questObj = quizArray[currentQuestion];
    var choices = questObj.choices;

    console.log(questObj);

    correctAnswer = questObj.answer;

    var h1 = quizQuestion.querySelector("h1");
    h1.textContent = questObj.question;

    for (var i = 0; i < choices.length; i++)
    {

        var li = document.createElement("li");

        var question = choices[i];
        var order = i +1;

        li.appendChild(document.createTextNode(order +". "+question));

        var id = i;

        li.setAttribute("data-task-id", id); 

        quizList.appendChild(li);

    }

}

var clickHandler = function (event) {

    if(!event.target.hasAttribute("data-task-id")) return;

    var answer = event.target.getAttribute("data-task-id");

    validateAnswer(answer);


}

var viewHighScoreHandler = function (event)
{

changeSlide("high-scores");
fetchScores();

}

var intervalHandler = function ()
{

    totalTime <= 0 ? endQuiz() : totalTime -= 1000;

    timeDisplay.textContent = "Time: "+totalTime/1000;

}

var submitScoreHandler = function (event)
{
event.preventDefault();



var input = document.querySelector("#initials");
var initials = input.value;
var id = getStorage();

var userScore = {

    name: initials,
    score: totalScore
}

window.localStorage.setItem(id, JSON.stringify(userScore));

changeSlide("high-scores");
fetchScores();

}


var changeSlide = function(slide)
{
    var quizSlide = document.querySelector("#quiz");
    var scoreSlide = document.querySelector("#scores");
    var highScoresSlide = document.querySelector("#high-scores");
    var introSlide = document.querySelector("#intro");
    var result = document.querySelector("#result");

    quizSlide.style.display = "none";
    scoreSlide.style.display = "none";
    highScoresSlide.style.display = "none";
    introSlide.style.display = "none";
    result.style.display = "none";

    if(totalTime > 0)
    {

        slide = "quiz";
    }
    

    switch (slide) {
        case "quiz":
            quizSlide.style.display = "inline";
            result.style.display = "inline";
            break;
        case "scores":
            scoreSlide.style.display = "inline";
            result.style.display = "inline";
            break;
        case "high-scores":
            highScoresSlide.style.display = "inline";
            break;
        case "intro":
            introSlide.style.display = "flex";
            break;


    }
    

}

var validateAnswer = function (id) {

if(id == correctAnswer) correct();
else wrong();

nextQuestion();

}

var correct = function ()
{
 
  giveFeedback("Correct!");
   
}

var wrong = function ()
{
 totalTime -= 10000;
 giveFeedback("Wrong!");


}

var giveFeedback = function(feedback){

    var h2 = quizResult.querySelector("h2");
    h2.textContent = feedback;

}

var fetchScores = function()
{
   var scoresArray = [];

   var scoresArrayLength = getStorage();

   for (var i = 0; i < scoresArrayLength; i++)
   {
    var obj = JSON.parse(window.localStorage.getItem(i));
    if (obj) scoresArray.push(obj);
   }

   scoresArray.sort(function(a, b) { 
    return b.score -a.score;
  });

  printScores(scoresArray);

}

var printScores = function (scoresArray){

    userScore.innerHTML = '';

    for(var i=0; i < scoresArray.length; i++)
    {
        var order = 1+i;

        var li = document.createElement("li");


        li.appendChild(document.createTextNode(order+". "+scoresArray[i].name +" - "+scoresArray[i].score ));

        li.setAttribute("class","score");

        userScore.appendChild(li);

    }


}

var clearScores = function ()
{


    window.localStorage.clear();
    changeSlide("intro");
}

var nextQuestion = function (){

    if(currentQuestion++ >= quizArray.length -1)
    {
        endQuiz();
        return;

    }

    reset();
    addQuestion();

}

var endQuiz = function (){

totalScore = totalTime/1000;
totalTime = 0;

finalScore.textContent = "Your final score is: "+totalScore;

clearInterval(timeCount);
changeSlide("scores");

}


function getStorage() {

    var values = [],
        keys = Object.keys(window.localStorage),
        i = keys.length;



   return i
}


changeSlide("intro");

startBtn.addEventListener('click', startQuiz)
quizList.addEventListener('click', clickHandler);
submitScore.addEventListener('click', submitScoreHandler);
viewHighScores.addEventListener('click', viewHighScoreHandler);

