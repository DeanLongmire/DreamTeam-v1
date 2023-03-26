const express = require('express');
const bodyParser = require('body-parser');
const { getUser, createUser} = require('../controllers/global_users.js');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/:id', getUser);
router.post('/', createUser)

module.exports = router;