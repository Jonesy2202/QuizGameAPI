let quizQuestions = [];
let currentPlayer = 0;
let currentQuestion = 0;
let score = [];
const questionTimer = 2000;
const correctAnswerMessages = [
    "Well Done!",
    "Smashing Job!",
    "Congratulations!",
    "A point to you!",
    "Yippiee!"
];

const questionAmount = 10;

function playGame() {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('gameSettings', JSON.stringify(quizParameters));

    if(players.length > 0){
    window.location.href = "quiz.html";
    }else{
        alert("Please add a player!");
    }
}

async function setQuiz() {
    document.getElementById("leaderboard").style.display = "none";

    const playersString = localStorage.getItem('players');
    const gameSettings = localStorage.getItem('gameSettings');

    players = JSON.parse(playersString);
    quizParameters = JSON.parse(gameSettings);
    score = new Array(players.length).fill(0);

    console.log(players);

    const questionsResponse = await getQuestions();
    const questions = questionsResponse;
    storeQuestions(questions.results);
    gameSetup();
}

function storeQuestions(questions) {
    for (let i in questions)
        quizQuestions.push([i, questions[i]]);
}

function gameSetup() {
    if (currentQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuestion][1];
        console.table(quizQuestions[currentQuestion][1]);
        setQuestion(question);
    } else {
        finishGame();
    }
}

function setQuestion(question) {

    let player = players[currentPlayer];

    $("#question").html(player + "... " + question.question);

    $("#answers").empty();
    let buttons = [];

    let correctButton = $("<button></button><br>")
        .addClass("block")
        .attr("id", 1)
        .html(question.correct_answer)
        .on("click", () => submitAnswer(true, question.correct_answer));
    buttons.push(correctButton);

    if (question.type === "multiple") {
        for (let i = 0; i < question.incorrect_answers.length; i++) {
            let wrongButton = $("<button></button><br>")
                .addClass("block")
                .attr("id", i + 2)
                .html(question.incorrect_answers[i])
                .on("click", () => submitAnswer(false, question.correct_answer));

            buttons.push(wrongButton);
        }
    } else if (question.type === "boolean") {
        let wrongButton = $("<button></button><br>")
            .addClass("block")
            .attr("id", 2)
            .text(question.incorrect_answers)
            .on("click", () => submitAnswer(false, question.correct_answer));

        buttons.push(wrongButton);
    }

    const shuffledButtons = randomiseArray(buttons);
    for (let button of shuffledButtons) {
        $("#answers").append(button);
    }
}

function randomiseArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function randomNumber() {
    return Math.floor(Math.random() * (correctAnswerMessages.length));
}

function submitAnswer(answer, correctAnswer) {
    if (answer) {
        //do something to show correct
        $("#answers").append("<h5></h5>")
            .html(correctAnswerMessages[randomNumber()])
        score[currentPlayer]++;
    } else {
        //show correct answer
        $("#answers").append("<h5></h5>")
            .html("Correct answer: " + correctAnswer)
            .addClass("qAnswer");
    }

    setTimeout(function () {
        currentQuestion++;
        nextTurn();
    }, questionTimer);

}

function nextTurn() {
    if (currentQuestion < quizQuestions.length) {
        currentPlayer = (currentPlayer + 1) % players.length;
        const question = quizQuestions[currentQuestion][1];

        setQuestion(question);
    } else {
        finishGame();
    }
}

function finishGame() {
    $("#question").empty().text("The quiz has finished! Lets see who won...");

    $("#answers").empty();

    document.getElementById("leaderboard").style.display = "block";
    displayLeaderboard();
}

function displayLeaderboard() {
    const scoreboardTable = document.getElementById("scoreboard").getElementsByTagName('tbody')[0];
    scoreboardTable.innerHTML = "";

    for (let i = 0; i < players.length; i++) {
        const row = scoreboardTable.insertRow();
        const playerRow = row.insertCell(0);
        const scoreRow = row.insertCell(1);

        playerRow.textContent = players[i];
        scoreRow.textContent = score[i];
    }
}

async function getQuestions() {

    const quizUrl = 'https://opentdb.com/api.php?';

    const amount = players.length * questionAmount;
    const parameters = {
    amount: amount,
    ...quizParameters
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