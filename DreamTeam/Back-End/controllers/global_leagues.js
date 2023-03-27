const global_leagues = require("../Leagues/global_leagues_db.js")

const { v4: uuidv4 } = require('uuid');

let db = new global_leagues.league_dbmanager;
const get_path = (callback) => {
    const pwd = process.cwd();
    let db_path = pwd;
    db_path = db_path + "\\DreamTeam\\Back-End\\database.db"
    db_path = db_path.replace(/\\/g, "/");

    callback(db_path);
}

const get_league = (req, res) => {
    const { id } = req.params;

    get_path( (path) =>{
        db.open(path);
        db.get_all(id, (name, sport) => {
            console.log(name + " " + sport);
            db.close();
         });
    });

    res.send("Got a league's info");
};

const show_all = (req, res) => {
    get_path( (path) => {
        db.open(path);
        db.display_all( () => {
            db.close();
        });
    });
    res.send("read all");
}

const create_league = (req, res) => {
    const league = req.body;
    const leagueID = uuidv4();

    const uwid = { ... league, id: leagueID}

    console.log(uwid);
    get_path( (path) => {
      db.open(path);
      db.insert(uwid.name,uwid.id,uwid.sport, () =>{
          db.close();
          res.send('League with the name ${uwid.name} added to the database');
        });
    });
}

//figure out where variables for new stuff comes from
const update_name = (req, res) => {
    const { id } = req.params;
    //const new_name = req.body.newName
}

const update_sport = (req, res) => {
    const { id } = req.params;
    //const new_sport = req.body.newSport
}

module.exports = {get_league, show_all, create_league, update_name, update_sport}