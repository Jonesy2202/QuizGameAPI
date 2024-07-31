let quizParameters = {};

function quizSettings() {
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficultySlider").value;

    if(difficulty == 1){
        quizParameters.difficulty = "easy";
    } else if(difficulty == 2){
        quizParameters.difficulty = "medium";
    } else if(difficulty == 3){
        quizParameters.difficulty = "hard";
    } else {
        quizParameters.difficulty = "medium";
    }

        quizParameters.category = category;

        document.getElementById("confirmSettings").style.display = "block";
        document.getElementById("confirmSettings").innerHTML = "Settings have been changed.";
}