const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.use(function (req, res, next) {
    //Tillåt requests från alla origins
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


app.listen(3000, ()=>{
    console.log("Listening to port 3000...")
})

app.post('/player', (req, res)=>{
    const playerName = req.body.name;
    const playerScore = req.body.score;

    // Läser in nuvarande highscore-data 
    const highscore = JSON.parse(fs.readFileSync('./data/highscore.json'))
    const playerIndex = highscore.findIndex(player => player.name === playerName);
    

    if(playerIndex === -1) {
    // Lägg till den nya spelaren 
      highscore.push({name: playerName, score: playerScore});
    }
    
    

    // Skriver tillbaka highscore-data till filen
    fs.writeFileSync('./data/highscore.json', JSON.stringify(highscore))


    res.json({name: playerName, score: playerScore});

})


app.get('/player/score', (req, res)=>{
  const playerName = req.query.name;
  
  const highscore = JSON.parse(fs.readFileSync('./data/highscore.json'));

  const playerIndex = highscore.findIndex(player => player.name === playerName);

  if(playerIndex !== -1) {
    res.json(highscore[playerIndex].score);
  }
})

app.get('/highscores', (req, res)=>{

  const highscore = JSON.parse(fs.readFileSync('./data/highscore.json'));

  res.json(highscore.sort((a, b) => b.score - a.score ).slice(0, 5));
})

// Här ska du uppdatera highscore listan xD 
app.post('/player/update', (req, res)=>{
  const playerName = req.body.name;
  const playerScore = req.body.score;

  const highscore = JSON.parse(fs.readFileSync('./data/highscore.json'));

  const playerIndex = highscore.findIndex(player => player.name === playerName);
  
  if(playerIndex !== -1) {
    highscore[playerIndex].score = playerScore;

    fs.writeFileSync('./data/highscore.json', JSON.stringify(highscore));

    res.json({message: "Score updated sucessfully cuuuuz"});  
  } else {
    res.json({message: "player not found blut"})
  }
  
})