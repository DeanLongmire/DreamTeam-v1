const express = require('express');
const bodyParser = require('body-parser');
//const { getUser, createUser} = require('../controllers/global_users.js');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    const userData = req.body;
    console.log(userData); // Output: { name: 'John Doe', email: 'johndoe@example.com', password: 'password123' }
    // Do something with userData, such as saving it to a database
    res.send('User created');
  });

router.get('/', (req, res) => {
    res.send("Test");
  });

module.exports = router;