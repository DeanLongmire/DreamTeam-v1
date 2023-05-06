const global_players = require("../Players/global_players_db.js");
const global_users = require("../Users/global_users_db.js");

const { v4: uuidv4 } = require('uuid');

let db = new global_players.player_dbmanager;
let usersDb = new global_users.users_dbmanager;

const get_path = (callback) => {
    const pwd = process.cwd();
    let db_path = pwd;
    db_path = db_path + "\\DreamTeam\\Back-End\\database.db"
    db_path = db_path.replace(/\\/g, "/");

    callback(db_path);
}

const get_player = (req, res) => {
    const { id } = req.params;

    get_path((path) =>{
        db.open(path);
        db.get_all(id, (name, username, ID, Team_ID, position)=> {
            console.log(name + " " + username + " " + ID + " " + Team_ID + " " + position);
            db.close();
        });
    });

    res.send("Got a player's info");
}

const get_players_on_team = (req, res) => {
    const { teamId } = req.params;

    get_path((path) => {
        db.open(path);
        db.get_players_on_team(teamId,(players) => {
            db.close();
            if(players === "No players")
            {
                res.status(201).send(players);
            }
            else
            {
                res.status(200).send(players);
            }
        })
    }); 
}

const show_all = (req, res) => {
    get_path( (path) => {
        db.open(path);
        db.display_all( () =>{
            db.close();
        });
    });
    res.send("show all players");
}

const create_player = (req, res) => {
    const player = req.body;
    const playerID = uuidv4();

    const uwid = { ... player, id: playerID}

    console.log(uwid);
    get_path((path) => {
        db.open(path);
        db.insert(uwid.player,uwid.username,uwid.id,uwid.teamId,uwid.pos,0,0,0,0,0,0,0,0,() =>{
            db.close();
            usersDb.open(path);
            usersDb.update_playerId(uwid.id,uwid.userId,() => {
                usersDb.close();
                console.log("Got to here");
                res.send('Player added to database');
            })
        });
    });
}

const delete_player = (req, res) => {
    const { id } = req.params;

    get_path( (path) =>{
        db.open(path);
        db.delete(id, () =>{
            db.close();
            res.send('Player deleted');
        });
    });
}

const update_name = (req, res) =>{
    const { id } = req.params;
    const new_name = req.body.newName;

    console.log(new_name + " " + id);
    get_path((path) =>{
        db.open(path);
        db.update_name(new_name,id, () =>{
            db.close();
        });
    });
    res.send('Player name updated');
}

const update_position = (req, res) =>{
    const { id } = req.params;
    const new_position = req.body.newPosition;

    console.log(new_position + " " + id);
    get_path((path)=>{
        db.open(path);
        db.update_position(new_position,id, ()=>{
            db.close();
        });
    });
    res.send('Position updated');
}

const increment_TD = (id, newTDs) => {
    get_path((path) => {
        db.open(path);
        db.increment_TD(newTDs,id,() => {
            db.close();
        })
    })
}

const promise_stats = (id,newStats) => {
    return new Promise((resolve,reject) => {
        let updateCount = 0;

        if(newStats.TDs !== undefined)
        { 
            increment_TD(id,newStats.TDs);
            updateCount++;
            if(updateCount === newStats.numToBeUpdated)
            {
                resolve();
            }
        }
        if(newStats.catches !== undefined)
        { 
            console.log(newStats.catches);
        }
        if(newStats.tackles !== undefined)
        { 
            console.log(newStats.tackles);
        }
        if(newStats.goals !== undefined)
        { 
            console.log(newStats.goals);
        }
        if(newStats.saves !== undefined)
        { 
            console.log(newStats.saves);
        }
        if(newStats.hits !== undefined)
        { 
            console.log(newStats.hits);
        }
        if(newStats.RBIs !== undefined)
        { 
            console.log(newStats.RBIs);
        }
        if(newStats.errors !== undefined)
        {
            console.log(newStats.errors); 
        }
    });
}

const increment_stats = (req,res) => {
    const { id } = req.params;
    const newStats = req.body;

    promise_stats(id,newStats).then(() => {
        res.send("Stats Incremented");
    })
}

module.exports = {get_player, get_players_on_team, show_all, create_player, delete_player, update_name, update_position, increment_stats}