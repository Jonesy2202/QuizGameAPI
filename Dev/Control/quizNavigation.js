
function displayPlayersTab() {
    document.getElementById("quizSettings").style.display = "none";
    document.getElementById("playerForm").style.display = "block";
    document.getElementById("addPlayersTab").classList.add("active");
    document.getElementById("gameSettingsTab").classList.remove("active");
    document.getElementById("confirmSettings").style.display = "none";
}

function displaySettingsTab() {
    document.getElementById("quizSettings").style.display = "block";
    document.getElementById("playerForm").style.display = "none";
    document.getElementById("gameSettingsTab").classList.add("active");
    document.getElementById("addPlayersTab").classList.remove("active");
}

function displayHowToPlay() {
    document.getElementById("help").style.display = "none";
    document.getElementById("howToPlay").style.display = "block";
    document.getElementById("howToPlayTab").classList.add("active");
    document.getElementById("helpTab").classList.remove("active");
}

function displayHelp() {
    document.getElementById("help").style.display = "block";
    document.getElementById("howToPlay").style.display = "none";
    document.getElementById("helpTab").classList.add("active");
    document.getElementById("howToPlayTab").classList.remove("active");
}

function quitQuiz() {
    window.location.href = "index.html";
}

