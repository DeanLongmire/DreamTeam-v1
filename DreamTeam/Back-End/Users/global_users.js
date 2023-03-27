const express = require('express');
const bodyParser = require('body-parser');
const { get_user, create_user, update_username, update_email } = require('../controllers/global_users.js');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/:id', get_user);
router.post('/', create_user)
router.patch('/update_username/:id', update_username)
router.patch('/update_email/:id', update_email)

module.exports = router;