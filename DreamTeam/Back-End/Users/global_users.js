const express = require('express');
const bodyParser = require('body-parser');
const { get_user, login, show_all, create_user, delete_user, update_firstname, update_lastname, update_username, update_password, update_email, update_bio, update_position, update_profile_picture } = require('../controllers/global_users.js');

const router = express.Router();

router.use(bodyParser.json());

//list all Users to the console
router.get('/', show_all);

//Create a User
router.post('/', create_user);

//login user (User Authentication)
router.post('/login', login);

//Get a User's Info
router.get('/:id', get_user);

//Delete a User
router.delete('/:id', delete_user);

//Update User Info
router.patch('/update_username/:id', update_username);
router.patch('/update_email/:id', update_email);
router.patch('/update_bio/:id', update_bio);
router.patch('/update_lastname/:id', update_lastname);
router.patch('/update_firstname/:id', update_firstname);
router.patch('/update_position/:id', update_position);
router.patch('/update_password/:id', update_password);
router.patch('/update_picture/:id', update_profile_picture);

module.exports = router;