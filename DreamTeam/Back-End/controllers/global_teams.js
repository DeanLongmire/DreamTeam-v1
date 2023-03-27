/*
    Controller for creating teams
*/

const global_teams = require("../Teams/global_teams_db.js");
const { v4: uuidv4 } = require('uuid');

let db = new global_teams.team_dbmanager;

// Get team information
const get_team = (req, res) => {
    const { id } = req.params;

    db.open();
    db.get_all(id, (name, ID, P_ID, sport, num_players) => {
        console.log(name + " " + ID + " " + P_ID + " " + sport + " " + num_players)
        db.close();
    });

    res.send("Got a Teams's info");
}

// Diplay all teams in DB
const show_all = (req, res) => {
    db.open();
    db.display_all( () => {
        db.close();
    });
}

// create a team
const create_team = (req, res) => {
    const team = req.body;
    const teamId = uuidv4();
  
    //adds unique ID to the team (team W/ ID)
    const teamWid = { ... team, id: teamId}

    console.log(teamWid);

    db.open();
    db.insert(teamWid.name, teamWid.ID, teamWid.P_ID, teamWid.sport, teamWid.num_players,() =>{
        db.close();
        res.send(`Team with the name ${uwid.name} added to the Teams database`);
    });
}

// updating only name for a team
const update_team_name = (req, res) => {
    const { id } = req.params;
    const newTeamName = req.body.new_name;

    console.log(new_name + " " + id);

    db.open();
    db.update_name(new_name, id.name, () => {
        db.close();
    });


    res.send('Team name updated');
}

// updating only the sport that the team plays\
const update_team_sport = (req, res) => {
    const { id } = req.params;
    const newTeamSport = req.body.new_sport;

    console.log(newTeamSport + " " + id);

    db.open();
    db.update_sport(newTeamSport, id.sport, () => {
        db.close();
    });
}

// Updating amount of players on a given team in this function
const updatePlayerCount = (req, res) => {
    const { id } = req.params;
    const newPcount = req.body.new_pCount;

    console.log(`Team with id: ${id} has new player count of ${newPcount}`);

    db.open();
    db.update_num_players(id.name, newPcount, () => {
        db.close();
    });
    
}



module.exports = { get_team, show_all, create_team, update_team }