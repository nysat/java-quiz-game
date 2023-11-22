const questions = [
    {
        question: 'Commonly used data types DO Not include?',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false },
        ]
    },
    {
        question: 'The condtion in an if / else statement is enclosed with?',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parenthesis', correct: true },
            { text: 'square brackets', correct: false },
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store?',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true },
        ]
    },
    {
        question: 'what is the answer to this question?',
        answers: [
            { text: 'this one!', correct: true },
            { text: 'THis oNE >:(', correct: false },
            { text: 'i think its probably not this one', correct: false },
            { text: 'definitely not this one!!', correct: false }
        ]
    },
];

const questionContainerElement = document.getElementById('quiz'); //declaring a variable for the question container in the html
const questionElement = document.getElementById('question'); // declaring a variable for the question element in the html
const answerButton = document.getElementById('answer-buttons'); //declaring a variable for the answer buttons in the html
const nextButton = document.getElementById('next-btn');// declaring a variable for the next button in the html
const startButton = document.getElementById('start-btn'); //declaring a variable for the start button in the html
const timerElement = document.getElementById('timer'); // declaring a variable for the timer element in the html
const submitScoreButton = document.getElementById('submit');
var timerquiz = document.getElementById('timerquiz'); // declaring a variable for the timer element in the html
var counter = 20

let currentQuestionIndex = 0; //questions start at 0 index in the array 
let score = 0; //score starts at 0

startButton.addEventListener('click', startQuiz); //when the start button is clicked it will run the startQuiz function
;

function startQuiz() {
    console.log('started');
    currentQuestionIndex = 0; //when the quiz starts, the current question index is 0
    score = 0; //when the quiz starts, the score is 0
    startButton.classList.add('hide'); //when you start the quiz, the start button will hide
    questionContainerElement.classList.remove('hide'); //when you start the quiz, the question container will show
    nextButton.innerHTML = 'Next'; //when you restart
    showQuestion();
    startTimer();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; //this will display the current question 
    let questionNo = currentQuestionIndex + 1; //current question index plus one to display the question we are tryin to get 
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;//this is targeting the variable we made a little bit ago 
    //and it is displaying the current question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');// this is creating a button tag and storing it in the button variable
        button.innerHTML = answer.text;//in that button we have to put text in it so we are putting the answer-text from the array in it
        button.classList.add('btn');
        answerButton.appendChild(button);//adding the things from the array into the "buttons"
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);//when the button is clicked it will run the selectAnswer function
    })
}

function resetState() {
    nextButton.style.display = 'none'; //this is hiding the next button
    while (answerButton.firstChild) { //this is removing the answer buttons
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target; //this is targeting the button that was clicked
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct'); //this is adding the class of correct to the button that was clicked
        score++; //this is adding 1 to the score
    } else {
        selectedBtn.classList.add('incorrect'); //this is adding the class of incorrect to the button that was clicked
        counter -= 3;
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") { //for each button it is checking if the dataset is true and then will add the class of correct
            button.classList.add('correct');
        }
        button.disabled = true; //after that it will disable the buttons so you cant click them again
    });
    nextButton.style.display = 'block'; //the next button will display after you click an answer
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Restart';
    nextButton.style.display = 'block';
    document.getElementById('highscores').classList.remove('hide')
    document.getElementById('buttons').classList.add('hide')
}


function handleNextButton() {
    currentQuestionIndex++; //this is adding 1 to the current question index
    if (currentQuestionIndex < questions.length) { //if the current question index is less than the length of the questions array
        showQuestion(); //then it will show the next question
    } else {
        showScore();
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


function startTimer() {
    var timer = setInterval(function () {
        //     what its doing for each interval
        timerquiz.textContent = 'Timer:' + counter
        counter--
        if (counter < 0 || currentQuestionIndex === questions.length) {
            clearInterval(timer);
            showScore();
        }
    }, 1000)
}
function endQuiz() {
    questionContainerElement.style.display = 'none';

}

function saveScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value;

    const scoreData = { name, score };
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(scoreData);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    alert('Your score has been saved!');
    displayHighScores();
}


function displayHighScores() {
    // Get the high scores from local storage
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Get a reference to the ul element in the Highscores div
    let highScoresList = document.getElementById('HSList');

    // Create a new list item for each high score and append it to the list
    highScores.forEach(scoreData => {
        let listItem = document.createElement('li');
        listItem.textContent = `${scoreData.name}: ${scoreData.score}`;
        highScoresList.appendChild(listItem);
    });
}

document.getElementById('highscore-form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveScore();
});
