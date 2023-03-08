const bcrypt = require('bcrypt')

const saltRounds = 10;
const inputString = 'mypassword'
const storedString = 'mypassword'
const hash1 = '$2b$10$Vnm3oJlyQUrmg4vVukl0YujX4opFsN9FJacI.TGbJeu7bxiBp2F5W'

bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(inputString, salt, (err, hash) => {
    // Handle errors or use hash value in the next step
    const hash2 = hash
    console.log(hash)
    bcrypt.compare(hash1, hash2, function(err, result) {
        if (err) {
          // Handle error
        } else {
          if (result === true) {
            // Hashes match
            console.log('Hashes match!');
          } else {
            // Hashes don't match
            console.log('Hashes do not match!');
          }
        }
      });
  });
});