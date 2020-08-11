var quizList = document.querySelector("#list");
var quizQuestion = document.querySelector("#question");


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
questionObject4.question = "A very useful tool during development and debudding for printing out content to the debugger is:";
questionObject4.choices = ["Terminal bash", "Javascript","Console.log", "For loops"];
questionObject4.answer = 2;

var questionObject5 = {};
questionObject5.question = "String values must be enclosed with _______ when being associated with variables.";
questionObject5.choices = ["Brackets", "Quotes","Parenthesis", "Slashes"];
questionObject5.answer = 1;


var quizArray = [questionObject1, questionObject2, questionObject3,questionObject4,questionObject5];

var currentQuestion = 0;
var correctAnswer = 0;


var startQuiz = function (){

currentQuestion = 0;

reset();
addQuestion();

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

var validateAnswer = function (id) {

if(id == correctAnswer) alert("Correct!");
else alert("Wrong!");

nextQuestion();

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

alert("the end!");

}

startQuiz();

quizList.addEventListener('click', clickHandler)

