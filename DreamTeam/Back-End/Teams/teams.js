teams.js 

/*
    Handling get, post, patch, etc requests for creating teams
        in this file.
*/

const express = require('express');
const bodyParser = require('body-parser');
const { get_team, show_all, create_team, update_team_name, update_team_sport, updatePlayerCount } = require('../controllers/global_teams.js');

const router = express.Router();

router.use(bodyParser.json());

//list all Teams to the console
router.get('/', show_all);

//Get a Team's name
router.get('/:id', get_team);

//Create a team
router.post('/', create_team);

//Update team name
router.patch('/update_team_name/:id', update_team_name);

// update what sport a team plays
router.patch('/update_team_sport/:id', update_team_sport);

// update a team's num of players
router.patch('/updatePlayerCount/:id', updatePlayerCount);

module.exports = router;