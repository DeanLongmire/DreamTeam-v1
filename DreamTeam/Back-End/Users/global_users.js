const express = require('express');
const bodyParser = require('body-parser');
const { get_user, show_all, create_user, update_lastname, update_username, update_email, update_bio } = require('../controllers/global_users.js');

const router = express.Router();

router.use(bodyParser.json());

//list all Users to the console
router.get('/', show_all);

//Create a User
router.post('/', create_user);

//Get a User's Info
router.get('/:id', get_user);

//Update User Info
router.patch('/update_username/:id', update_username)
router.patch('/update_email/:id', update_email)
router.patch('/update_bio/:id', update_bio)
router.patch('/update_lastname/:id', update_lastname)

module.exports = router;