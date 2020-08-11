var quizList = document.querySelector("#list");
var quizQuestion = document.querySelector("#question");


var questionObject1 = {};
questionObject1.question = "Arrays in Javascript can be used to store _______.";
questionObject1.choices = ["Numbers, Strings", "Other Arrays","Boolean", "All of the Above"];
questionObject1.answer = 3;

var questionObject2 = {};
questionObject1.question = "Commonly used data types do NOT Include:";
questionObject1.choices = ["Alert", "Strings", "Boolean", "Numbers"];
questionObject1.answer = 0;

var questionObject3 = {};
questionObject1.question = "The condition in and if/else statement is enclosed with:";
questionObject1.choices = ["Curly brackets", "Brackets","Comma", "Parenthesis"];
questionObject1.answer = 3;

var questionObject4 = {};
questionObject1.question = "A very useful tool during development and debudding for printing out content to the debugger is:";
questionObject1.choices = ["Terminal bash", "Javascript","Console.log", "For loops"];
questionObject1.answer = 2;

var questionObject5 = {};
questionObject1.question = "String values must be enclosed with _______ when being associated with variables.";
questionObject1.choices = ["Brackets", "Quotes","Parenthesis", "Slashes"];
questionObject1.answer = 1;


var quizArray = [questionObject1, questionObject2,questionObject3,questionObject4,questionObject5];
var currentQuestion = 0;


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

    var h1 = quizQuestion.querySelector("h1");
    h1.textContent = questObj.question;

    for (var i = 0; i < choices.length; i++)
    {

        var li = document.createElement("li");

        var question = choices[i];
        var order = i +1;

        li.appendChild(document.createTextNode(order +". "+question));

        var id = i;

        li.setAttribute("id", id); 
       // l1.addEventListener("click",)
        quizList.appendChild(li);

    }

}

var clickHandler = function (event) {

    alert(event.target.getAttribute("id"));


}

quizList.addEventListener('click', clickHandler)

