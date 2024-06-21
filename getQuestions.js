let quizQuestions = [];
let currentPlayer = 0;
let currentQuestion = 0;
let score = [];
const questionTimer = 3000;
const correctAnswerMessages = [
    "Well Done!",
    "Smashing Job!",
    "Congratulations!",
    "A point to you!",
    "Yippiee!"
]

function playGame() {
    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = "quiz.html";
}

async function setQuiz() {
    document.getElementById("leaderboard").style.display = "none";

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
    console.log(score);
    //display question
    $("#question").html(question.question);

    $("#answers").empty();
    let buttons = [];

    let correctButton = $("<button></button>")
        .addClass("btn")
        .attr("id", 1)
        .text(question.correct_answer)
        .on("click", () => submitAnswer(true, question.correct_answer));

    buttons.push(correctButton);

    if (question.type === "multiple") {
        for (let i = 0; i < question.incorrect_answers.length; i++) {
            let wrongButton = $("<button></button>")
                .addClass("btn")
                .attr("id", i + 2)
                .text(question.incorrect_answers[i])
                .on("click", () => submitAnswer(false, question.correct_answer));

            buttons.push(wrongButton);
        }
    } else if (question.type === "boolean") {
        let wrongButton = $("<button></button>")
            .addClass("btn")
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
            .text(correctAnswerMessages[randomNumber()]);
        score[currentPlayer]++;
    } else {
        //show correct answer
        $("#answers").append("<h5></h5>")
            .text("Correct answer: " + correctAnswer);
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
}

function displayLeaderboard() {
    const recipeTable = document.getElementById("scoreboard");

    for (let i = 0; i < players.length; i++) {
        const row = recipeTable.insertRow();
        const playerRow = row.insertCell(0);
        const scoreRow = row.insertCell(1);

        playerRow.textContent = players[i];
        scoreRow.textContent = score[i];
    }
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