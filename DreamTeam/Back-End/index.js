const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

//Routes
const usersRoutes = require('./Users/global_users.js');
const leagues = require('./Leagues/global_leagues.js');
const teams = require('./Teams/teams.js');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/leagues', leagues);
app.use('/teams', teams)

https
  .createServer(
    {
      key: fs.readFileSync('C:/Users/deanl/Desktop/GitHub-Repositories/Software-Engineering/DynProg/DreamTeam/Back-End/certs/myCA.key'),
      cert: fs.readFileSync('C:/Users/deanl/Desktop/GitHub-Repositories/Software-Engineering/DynProg/DreamTeam/Back-End/certs/myCA.pem'),
      passphrase: 'dinoProgramming'
    },
    app
  )
  .listen(5000, function () {
    console.log(
        `Server Running on port: https://localhost:${PORT}`
    );
});

//app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))