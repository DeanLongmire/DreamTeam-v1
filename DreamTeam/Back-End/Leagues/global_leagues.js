const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    const userData = req.body;
    console.log(userData); 

    // Do something with userData, such as saving it to a database

    res.send('User created');
  });

router.get('/', (req, res) => {
    res.send("Test");
  });

module.exports = router;