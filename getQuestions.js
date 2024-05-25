let quizQuestions = [];

function playGame(){
    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = "quiz.html";
}

async function setQuiz() {
    const playersString = localStorage.getItem('players');
    players = JSON.parse(playersString);
    console.log(players.length);
    const questionsResponse = await getQuestions();
    const questions = questionsResponse;
    storeQuestions(questions.results);
    displayQuestions();
}

function storeQuestions(questions) {
    for(let i in questions)
        quizQuestions.push([i, questions [i]]);
}

//switch player
//display new question
//add score
//when question all questions are done, finsih game

function displayQuestions() {
    console.log(quizQuestions);
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