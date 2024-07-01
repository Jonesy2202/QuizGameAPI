
function displayPlayersTab() {
    document.getElementById("quizSettings").style.display = "none";
    document.getElementById("playerForm").style.display = "block";
    document.getElementById("addPlayersTab").classList.add("active");
    document.getElementById("gameSettingsTab").classList.remove("active");
}

function displaySettingsTab() {
    document.getElementById("quizSettings").style.display = "block";
    document.getElementById("playerForm").style.display = "none";
    document.getElementById("gameSettingsTab").classList.add("active");
    document.getElementById("addPlayersTab").classList.remove("active");
}

