let quizParameters = {};

function quizSettings() {
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficultySlider").value;

    if (difficulty == 1) {
        quizParameters.difficulty = "easy";
    } else if (difficulty == 2) {
        quizParameters.difficulty = "medium";
    } else if (difficulty == 3) {
        quizParameters.difficulty = "hard";
    } else {
        quizParameters.difficulty = "medium";
    }

    quizParameters.category = category;

    document.getElementById("confirmSettings").style.display = "block";

    if (!$("#confirmSettings").children().length) {
        $("#confirmSettings")
            .append("<span class='closebtn'>&times;</span>")
            .find(".closebtn").click(function () {
                $(this).parent().hide();
            });
        $("#confirmSettings").append("Quiz settings changed successfully.");
    }
}