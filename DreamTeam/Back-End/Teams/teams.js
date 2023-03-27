/*
    Handling get, post, patch, etc requests for creating teams
        in this file.
*/

const express = require('express');
const bodyParser = require('body-parser');
const { get_team, show_all, create_team, update_team } = require('../controllers/global_teams.js');

const router = express.Router();

router.use(bodyParser.json());

//list all Teams to the console
router.get('/', show_all);

//Get a Team's name
router.get('/:id', get_team);

//Create a User
router.post('/', create_team)

//Update team name
router.patch('/update_team/:id', update_team)


module.exports = router;