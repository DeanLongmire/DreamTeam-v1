const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./Users/global_users.js');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.static('DreamTeam/Front-End'))

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.sendFile('C:/Users/deanl/Desktop/GitHub Repositories/COSC 340/DynProg/DreamTeam/Front-End/index.html');
});

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))