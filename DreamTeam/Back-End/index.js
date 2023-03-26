const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./Users/global_users.js');
const leagues = require('./Leagues/global_leagues.js')
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/leagues', leagues);


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))