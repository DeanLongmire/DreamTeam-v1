const express = require('express');
const bodyParser = require('body-parser');
const { get_league, show_all, create_league, update_name, update_sport } = require('../controllers/global_leagues.js');

const router = express.Router();

router.use(bodyParser.json());

//list all leagues to console
router.get('/', show_all);

//create league
router.post('/', create_league);

//get league info
router.get('/:id'. get_league);

//update league info
router.patch('/update_name/:id', update_name)
router.patch('/update_name/:id'. update_sport)

module.exports = router;