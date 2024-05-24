async function setQuiz() {
    const questionsResponse = await getQuestions();
    const questions = questionsResponse;
    displayQuestions(questions.results);
}

//switch player
//display new question
//add score
//when question all questions are done, finsih game

function displayQuestions(questions) {
    console.log(questions);
    questions.forEach(question => {
        document.getElementById("questions").innerHTML = question.question;
    });
}

async function getQuestions() {

    const quizUrl = 'https://opentdb.com/api.php?';

    const parameters = {
        amount: 40
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