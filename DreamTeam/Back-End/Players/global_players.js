const express = require('express');
const bodyParser = require('body-parser');
const {get_player, get_players_on_team, show_all, create_player, delete_player, update_name, update_position} = require('../controllers/global_players.js');
const router = express.Router();

router.use(bodyParser.json());

//list all players to console
router.get('/', show_all);

//create player
router.post('/', create_player);

//get player info
router.get('/:id', get_player);
router.get('/get_players_on_team/:teamId', get_players_on_team);

//delete player
router.delete('/:id', delete_player);

//update player info
router.patch('/update_name/:id', update_name);
router.patch('/update_position/:id', update_position);

module.exports = router;