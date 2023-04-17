const express = require('express');
const session = require('express-session');
const sqlite = require("better-sqlite3");
const SqliteStore = require("better-sqlite3-session-store")(session)
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

//Routes
const usersRoutes = require('./Users/global_users.js');
const leagues = require('./Leagues/global_leagues.js');
const teams = require('./Teams/teams.js');
const players = require('./Players/global_players.js');

const app = express();
const PORT = 5000;

//set up session store
const db = new sqlite("DreamTeam/Back-End/sessions.db", { verbose: console.log });
let sessionStore = new SqliteStore({
    client: db, 
    expired: {
      clear: true,
      intervalMs: 900000 //ms = 15min
    }
});

//sets up user sessions
sessID = uuidv4();
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: 'none'
    }
}));

//allows connections 
app.use(cors({
    origin: 'http://127.0.0.1:5500', //configured to accept connection from html pages launched with live server
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//used for REST API data transfer
app.use(bodyParser.json());

//adds a route to the url
app.use('/users', usersRoutes);
app.use('/leagues', leagues);
app.use('/teams', teams);
app.use('/players', players);

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

module.exports = { sessionStore };