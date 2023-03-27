const express = require('express');
const bodyParser = require('body-parser');
const { get_league, show_all, create_league, update_name, update_sport } = require('../controllers/global_leagues.js');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    const userData = req.body;
    console.log(userData); 

    // Do something with userData, such as saving it to a database

    res.send('User created');
  });

router.get('/', (req, res) => {
    res.send("Test");
  });

module.exports = router;