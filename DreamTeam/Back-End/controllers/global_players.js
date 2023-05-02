const global_players = require("../Players/global_players_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_players.player_dbmanager;
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
    get_path( (path) =>{
        db.open(path);
        db.insert(uwid.player,uwid.username,uwid.id,uwid.teamId,uwid.pos, () =>{
            db.close();
            res.send('Player added to database')
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

module.exports = {get_player, show_all, create_player, delete_player, update_name, update_position}