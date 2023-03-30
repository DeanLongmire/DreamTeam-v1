/*
    Controller for creating teams
*/

const global_teams = require("../Teams/global_teams_db.js");
const { v4: uuidv4 } = require('uuid');

let db = new global_teams.team_dbmanager;


const get_path = (callback) => {
    const pwd = process.cwd();
    let db_path = pwd;
    db_path = db_path + "\\DreamTeam\\Back-End\\database.db";
    db_path = db_path.replace(/\\/g,"/");

    callback(db_path);
}

// Get team information
const get_team = (req, res) => {
    const { id } = req.params;

    get_path( (path) => {
        db.open(path);
        db.get_all(id, (name, ID, P_ID, sport, num_players) => {
            console.log(name + " " + ID + " " + P_ID + " " + sport + " " + num_players)
            db.close();
        });
    });
    res.send("Got a Teams's info");
}

// Diplay all teams in DB
const show_all = (req, res) => {
    get_path( (path) => {
        db.open(path);
        db.display_all( () => {
            db.close();
        });
    });

    res.send("Read all teams");
}

// create a team
const create_team = (req, res) => {
    get_path( (path) => {
        const team = req.body;
        const teamId = uuidv4();
  
        //adds unique ID to the team (team W/ ID)
        const teamWid = { ... team, id: teamId}

        console.log(teamWid);
    
        db.open(path);
        db.insert(teamWid.teamName, teamWid.id, teamWid.P_ID, teamWid.sport, teamWid.size, () =>{
            db.close();
            console.log("HERE")
            res.status(200).send(`Team with the name ${teamWid.name} added to the Teams database`);
        });
    });
}

// updating only name for a team
const update_team_name = (req, res) => {
    const { id } = req.params;
    const new_name = req.body.new_name;

    console.log(new_name + " " + id);

    db.open(db_path);
    db.update_name(new_name, id.name, () => {
        db.close();
    });


    res.send('Team name updated');
}

// updating only the sport that the team plays\
const update_team_sport = (req, res) => {
    const { id } = req.params;
    const new_sport = req.body.new_sport;

    console.log(new_sport + " " + id);

    db.open(db_path);
    db.update_sport(new_sport, id.sport, () => {
        db.close();
    });
}

// Updating amount of players on a given team in this function
const updatePlayerCount = (req, res) => {
    const { id } = req.params;
    const new_num_players = req.body.new_num_players;

    console.log(`Team with id: ${id} had ${id.num_players - new_num_players}`);
    console.log(`Team with id: ${id} NOW has new player count of ${new_num_players}`);

    db.open(db_path);
    db.update_num_players(id.name, newPcount, () => {
        db.close();
    });
    
}

module.exports = { get_team, show_all, create_team, update_team_name, update_team_sport, updatePlayerCount }