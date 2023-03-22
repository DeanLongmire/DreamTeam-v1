const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/store-data', function(req, res) {
  const name = req.body.name;

  // Store the name in your database here
  console.log(name);

  res.status(200).send('Data stored successfully');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});