async function getPlayer() {
    const url = "http://localhost:3000/player";
    const response = await fetch(url);
    const player = response.json();
    console.log(player);
    return player;
}
const form = document.querySelector("form");
form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const inputElement = document.querySelector("input");
    const buttonElement = document.querySelector("button");
    const computerResult = document.getElementById("computerResult");
    const playerName = document.querySelector("input").value;
    const playerScore = 0;
    const url = "http://localhost:3000/player";
    if (!playerName.trim()) {
        alert("Give us name pls xD");
        return;
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: playerName,
            score: playerScore
        })
    }).then((response)=>response.json()).then((data)=>{
        gameDisplay(data.name, data.score);
        console.log(data);
    });
    let computerChoice = [
        "sten",
        "sax",
        "p\xe5se"
    ];
    let randomIndex;
    let pick;
    const buttons = document.querySelectorAll("button[id]");
    buttons.forEach((button)=>button.style.display = "inline-block");
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            // console.log("clicked a button")
            randomIndex = Math.floor(Math.random() * computerChoice.length);
            pick = computerChoice[randomIndex];
            computerResult.textContent = "Computer Result: " + pick;
            let result = calcResult(pick, button.id);
        });
    });
    const highscoreList = document.getElementById("highscoreList");
    highscoreList.style = "border: 2px solid black";
    highscoreList.style.height = "350px";
    highscoreList.style.width = "150px";
    computerResult.style.display = "inline-block";
    inputElement.style.display = "none";
    buttonElement.style.display = "none";
});
function gameDisplay(playerName, playerScore) {
    const playerInfoElement = document.getElementById("playerInfo");
    playerInfoElement.innerHTML = `Name: ${playerName}, score ${playerScore}`;
}
async function scoreStore(result, playerName, playerScore) {
    if (result === 0) return;
    if (result === 1) {
        // Uppdatera databasen
        const updateUrl = "http://localhost:3000/player/update";
        const updateResponse = await fetch(updateUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: playerName,
                score: playerScore
            })
        });
        const updateData = await updateResponse.json();
        console.log(updateData);
    }
    result;
}
function calcResult(pick, choice) {
    if (pick === choice) return 0;
    else if (pick === "sten" && choice === "sax") return -1;
    else if (pick === "sax" && choice === "sten") return 1;
    else if (pick === "p\xe5se" && choice === "sax") return 1;
    else if (pick === "sax" && choice === "p\xe5se") return -1;
    else if (pick === "sten" && choice === "p\xe5se") return 1;
    else if (pick === "p\xe5se" && choice === "sten") return -1;
}
function databaseAnalyst() {}

//# sourceMappingURL=index.de158e3a.js.map
