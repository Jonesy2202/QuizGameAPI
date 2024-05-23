function getQuestions() {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=618f0aae0d60308137b17578ebd50bf7");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://opentdb.com/api.php?amount=20", requestOptions)
        .then((response) => response.text())
        .then((result) => console.table(result))
        .catch((error) => console.error(error));

}