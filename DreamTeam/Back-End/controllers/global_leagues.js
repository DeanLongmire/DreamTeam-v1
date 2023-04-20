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
    console.log(id);

    get_path( (path) =>{
        db.open(path, () => {
            db.get_all(id, (name, ID, sport) => {
                console.log(name + " " + ID + " " + sport);
                const leagueData = {
                    ID: ID,
                    name: name,
                    sport: sport
                };
            
                res.send(leagueData);
                db.close();
             });
        });
    });
};

//making cookies res.cookie(something)
//will
//create_session -- reference users

const show_all = (req, res) => {
    get_path( (path) => {
        db.open(path);
        db.display_all( () => {
            db.close();
        });
    });
    res.send("show all leagues");
}

const create_league = (req, res) => {
    const league = req.body;
    const leagueID = uuidv4();

    const uwid = { ... league, id: leagueID}

    console.log(uwid);
    get_path( (path) => {
      db.open(path);
      db.insert(uwid.leagueName,uwid.id,uwid.sport, () =>{
          db.close();
          res.send('League added to database');
        });
    });
}

const delete_league = (req, res) => {
    const { id } = req.params;

    get_path( (path) => {
        db.open(path);
        db.delete(id, () =>{
            db.close();
            res.send('League deleted');
        });
    });
}

const update_name = (req, res) => {
    const { id } = req.params;
    const new_name = req.body.newName;

    console.log(new_name + " " + id);
    get_path( (path) => {
         db.open(path);
         db.update_name(new_name,id, () =>{
            db.close();
         });
    });
    res.send('Sport name updated');
}

const update_sport = (req, res) => {
    const { id } = req.params;
    const new_sport = req.body.newSport; //newSport not real yet

    console.log(new_sport + " " + id);
    get_path( (path) => {
        db.open(path);
        db.update_sport(new_sport,id, () =>{
            db.close();
        });
    });
    res.send('Sport updated');
}

module.exports = {get_league, show_all, create_league, delete_league, update_name, update_sport}