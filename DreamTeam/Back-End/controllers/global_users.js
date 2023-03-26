const global_users = require("../Users/global_users_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_users.users_dbmanager;

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

    console.log(userWithId);

    db.open();
    db.insert(userWithId.id,null,null,null,userWithId.firstName,userWithId.lastName,null,null,null, () => {
        db.close();
        res.send(`User with the name ${userWithId.firstName} added to the database`);
    });
}

module.exports = { getUser, createUser }