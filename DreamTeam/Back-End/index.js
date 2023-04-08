const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
//const https = require('https');
//const fs = require('fs');

//Routes
const usersRoutes = require('./Users/global_users.js');
const leagues = require('./Leagues/global_leagues.js');
const teams = require('./Teams/teams.js');
const players = require('./Players/global_players.js');

//get certs path
/*const get_path_key = (callback) => {
    const pwd = process.cwd();
    let key = pwd + "/DreamTeam/Back-End/certs/private-key.pem";
    let pem = pwd + "/DreamTeam/Back-End/certs/certificate.pem";
    key = key.replace(/\\/g,"/");
    pem = pem.replace(/\\/g,"/");

    callback(key, pem);
}*/

const app = express();
const PORT = 5000;

//sets up user sessions
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: false
}));

//allows connections 
app.use(cors({
    origin: 'http://127.0.0.1:5500', //configured to accept connection from html pages launched with live server
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
}));

//used for REST API data transfer
app.use(bodyParser.json());

//adds a route to the url
app.use('/users', usersRoutes);
app.use('/leagues', leagues);
app.use('/teams', teams);
app.use('/players', players);

/*get_path_key( (key, pem) => {
    https
    .createServer(
        {
            key: fs.readFileSync(key),
            cert: fs.readFileSync(pem),
            passphrase: 'dinoProgramming'
        },
        app
        )
        .listen(5000, function () {
            console.log(
            `Server Running on port: https://localhost:${PORT}`
        );
    });
});*/

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));