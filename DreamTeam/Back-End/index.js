const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

//Routes
const usersRoutes = require('./Users/global_users.js');
const leagues = require('./Leagues/global_leagues.js');
const teams = require('./Teams/teams.js');

//get certs path
const get_path_key = (callback) => {
    const pwd = process.cwd();
    let key = pwd + "/DreamTeam/Back-End/certs/private-key.pem";
    let pem = pwd + "/DreamTeam/Back-End/certs/certificate.pem";
    key = key.replace(/\\/g,"/");
    pem = pem.replace(/\\/g,"/");

    callback(key, pem);
}

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

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))