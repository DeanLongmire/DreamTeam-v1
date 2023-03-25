const express = require('express');
const bodyParser = require('body-parser');
const { getUser, createUser} = require('../controllers/global_users.js');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/:id', getUser);
router.post('/', createUser)

module.exports = router;