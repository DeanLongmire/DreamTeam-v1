const global_users = require("../Users/global_users_db.js")
const { v4: uuidv4 } = require('uuid');


const getUser = (req, res) => {
    const { id } = req.params;

    driver.get_user_name(ID, (us) => {
        console.log(`User ${ID}'s username is ${us}\n`)
        callback()
    })

    res.send();
}

const createUser = (req, res) => {
    const user = req.body;
    const userID = uuidv4();
  
    const userWithId = { ... user, id: userID}

    //add to database using global_users_db.js
  
    res.send(`User with the name ${user.name} added to the database`);
}

module.exports = { getUser, createUser }