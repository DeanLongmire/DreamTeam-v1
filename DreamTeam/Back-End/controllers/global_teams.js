/*
    Controller for creating teams
*/

const global_teams = require("../Teams/global_teams_db.js");

let db = new global_teams.team_dbmanager;


const get_team = (req, res) => {
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
    db.display_all( () => {
        db.close();
    });
}

const create_team = (req, res) => {
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

const update_team = (req, res) => {
    const { id } = req.params;
    const new_username = req.body.newUsername;

    console.log(new_username + " " + id);

    db.open();
    db.update_user_name(new_username,id, () => {
        db.close();
    });

    res.send('Username updated');
}




module.exports = { get_user, show_all, create_user, update_lastname, update_username, update_email, update_bio }