/*
    Handling get, post, patch, etc requests for creating teams
        in this file.
*/

const express = require('express');
const bodyParser = require('body-parser');
const { 
    get_team, show_all,
    create_team,
    update_team_name,
    update_team_sport,
    updatePlayerCount,
    DeleteTeam,
    UpdateWins,
    UpdateLosses,
    createTeamSession,
    SetA_ID,
    UpdateTeamPicture
} = require('../controllers/global_teams.js');
const { update_profile_picture } = require('../controllers/global_users.js');

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

// patch to update the amount of wins a team has
router.patch('/update_team_wins/:id', UpdateWins);

// patch to update the amount of losses a team has
router.patch('/update_team_losses/:id', UpdateLosses);

// patch to add an admin id
router.patch('/update_admin_id/:id', SetA_ID);

// Delete a team from the database
router.delete('/:id', DeleteTeam);

router.get('/get_team_session/:id', createTeamSession);

router.patch('/update_picture/:id', update_profile_picture);

module.exports = router;