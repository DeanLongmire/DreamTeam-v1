const global_users = require("../Users/global_users_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_users.users_dbmanager;

const get_user = (req, res) => {
    const { id } = req.params;

    driver.get_user_name(ID, (us) => {
        console.log(`User ${ID}'s username is ${us}\n`)
        callback()
    })

    res.send();
}

const create_user = (req, res) => {
    const user = req.body;
    const userID = uuidv4();
  
    //adds unique ID to the user
    const uwid = { ... user, id: userID}

    console.log(uwid);

    db.open();
    db.insert(uwid.id,uwid.username,uwid.email,uwid.password,uwid.firstName,uwid.lastName,uwid.bio,uwid.position,null, () => {
        db.close();
        res.send(`User with the name ${uwid.firstName} added to the database`);
    });
}

const update_username = (req, res) => {
    const { id } = req.params;
    const new_username = req.body.newUsername;

    console.log(new_username + " " + id);

    db.open();
    db.update_user_name(new_username,id, () => {
        db.close();
    });

    res.send('Username updated');
}

const update_email = (req, res) => {
    const { id } = req.params;
    const new_email = req.body.newEmail;

    console.log(new_email + " " + id);

    db.open();
    db.update_email(new_email,id, () => {
        db.close();
    });

    res.send('Email updated');
}

module.exports = { get_user, create_user, update_username, update_email }