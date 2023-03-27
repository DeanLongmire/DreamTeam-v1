const global_users = require("../Users/global_users_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_users.users_dbmanager;

/*const pwd = process.cwd();
let db_path = pwd.slice(0,-12);
db_path = db_path + "\\database.db";
db_path = db_path.replace(/\\/g,"/");*/

const get_user = (req, res) => {
    const { id } = req.params;

    db.open();
    db.get_all(id, (username,first_name,last_name,email,bio,pos) => {
        console.log(username + " " + first_name + " " + last_name + " " + email + " " + bio + " " + pos)
        db.close();
    });

    res.send("Got a user's info");
}

const show_all = (req, res) => {
    db.open();
    const output = (db.display_all( () => {
        db.close();
    }));

    res.send(output);
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

const update_bio = (req, res) => {
    const { id } = req.params;
    const new_bio = req.body.newBio;

    console.log(new_bio + " " + id);

    db.open();
    db.update_bio(new_bio,id, () => {
        db.close();
    });

    res.send('Bio updated');
}

const update_lastname = (req, res) => {
    const { id } = req.params;
    const new_lastname = req.body.newLastname;

    console.log(new_lastname + " " + id);

    db.open();
    db.update_last_name(new_lastname,id, () => {
        db.close();
    });

    res.send('Lastname updated');
}

module.exports = { get_user, show_all, create_user, update_lastname, update_username, update_email, update_bio }