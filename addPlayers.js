let players = [];

function addPlayer() {
    const playerName = $("#playerName").val();
    if (players.length < 4) {
        if (playerName) {
            if (!players.includes(playerName)) {
                
                players.push(playerName);
                displayPlayer(playerName);

            } else { alert("This Player Already Exists"); }
        } else { alert("Must insert a player name!"); }
    } else { alert("Player count has been reached!"); }
}

function displayPlayer(playerName) {
    const playerId = playerName.replace(/\s+/g, '-').toLowerCase();

    const insertPlayerName = $("<p></p>")
        .text(playerName);

    const removePlayerButton = $("<button>Remove Player</button>")
        .addClass("btn btn-sm btn-danger")
        .attr("id", playerId)
        .attr("onclick", "removePlayer('" + playerId + "," + playerName + "')");

    insertPlayerName.append(removePlayerButton);

    $("#playerList").append(insertPlayerName);
}

function removePlayer(playerId, playerName) {
    $("#" + playerId).parent().remove();

    let playerIndex = players.indexOf(playerName);
    players.splice(playerIndex, 1);
}