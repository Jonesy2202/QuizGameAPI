let quizQuestions = [];
let currentPlayer = 0;
let currentQuestion = 0;
let score = [];

function playGame() {
    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = "quiz.html";
}

async function setQuiz() {
    const playersString = localStorage.getItem('players');
    players = JSON.parse(playersString);
    score = new Array(players.length).fill(0);

    const questionsResponse = await getQuestions();
    const questions = questionsResponse;
    storeQuestions(questions.results);
    gameSetup();
}

function storeQuestions(questions) {
    for (let i in questions)
        quizQuestions.push([i, questions[i]]);
}

//display new question
//add score
//when question all questions are done, finsih game

function gameSetup() {
    if (currentQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuestion][1];
        setQuestion(question);
    } else {
        finishGame();
    }
}

function setQuestion(question) {
    //display question
    console.log(question.question);
    $("#question").html(question.question);

    //display buttons
    //get question type
    //get correct answer and make button
    //get incorrect answers and make buttons
    //randomly display buttons
}

function submitAnswer(answer) {
    if (answer) {
        //do something to show correct
        score[currentPlayer]++;
    } else {
        //show correct answer
    }
    nextTurn();
}

function nextTurn() {
    currentPlayer = (currentPlayer + 1) % players.length;
    currentQuestion++;
    setQuestion();
}

function finishGame() {
    //display leaderboard
}

async function getQuestions() {

    const quizUrl = 'https://opentdb.com/api.php?';

    const amount = players.length * 10;

    const parameters = {
        amount: amount
    };

    const paramString = Object.keys(parameters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
        .join('&');

    const newUrl = `${quizUrl}${paramString}`;

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=618f0aae0d60308137b17578ebd50bf7");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(newUrl, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error fetching questions:', error);
    }
}