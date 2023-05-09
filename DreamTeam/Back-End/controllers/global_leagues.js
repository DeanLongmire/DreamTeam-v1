const global_leagues = require("../Leagues/global_leagues_db.js")
const fs = require('fs');
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

    get_path((path) =>{
        db.open(path, () => {
            db.get_all(id, (name, ID, adminID, sport, picPath) => {
                let encodedPic;
                if(picPath != null){
                    encodedPic = encodePhoto(picPath);
                }
                console.log(name + " " + ID + " " + sport);
                const leagueData = {
                    ID: ID,
                    adminId: adminID,
                    name: name,
                    sport: sport,
                    pp: encodedPic
                };
            
                res.send(leagueData);
                db.close();
             });
        })
    });
};


const show_all = (req, res) => {
    get_path((path) => {
        db.open(path);
        db.display_all( (league_names,league_sports,league_ids) => {
            const data = { 
                names: league_names,
                sports: league_sports,
                ids: league_ids
            }
            db.close();
            res.send(data);
        });
    });
}

const create_league = (req, res) => {
    const league = req.body;
    const leagueID = uuidv4();

    const uwid = { ... league, id: leagueID}

    console.log(uwid);
    get_path((path) => {
      db.open(path);
      db.insert(uwid.leagueName,uwid.id,uwid.adminId,uwid.sport,null, () =>{
          db.close();
          const leagueData = {
            id: uwid.id
          }
          res.send(leagueData);
        });
    });
}

const delete_league = (req, res) => {
    const { id } = req.params;

    get_path((path) => {
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

    get_path((path) => {
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

    get_path((path) => {
        db.open(path);
        db.update_sport(new_sport,id, () =>{
            db.close();
        });
    });
    res.send('Sport updated');
}

const update_profile_picture = (req, res) => {
    const { id } = req.params;
    const new_pp = req.body.pp;

    storePhoto(new_pp,id,(picPath) =>{
        get_path((path) => {
            db.open(path);
            db.update_profile_picture(picPath,id,() =>{
                db.close();
            })
            res.send('Picture Updated');
        })
    })
}

const storePhoto = function(base64Encoded, id, callback){
    const data = base64Encoded.replace(/^data:image\/\w+;base64,/, "");
    console.log(data);
    const buffer = Buffer.from(data, 'base64');

    let picPath = "./DreamTeam/Back-End/Leagues/profile_pictures/" + id + ".png";

    fs.writeFile(picPath, buffer, function(err) {
        if(err){
            console.log(err);
        } else{

        }
    })
    callback(picPath);
}

const encodePhoto = function(picPath) {
    console.log(picPath)

    let pic = fs.readFileSync(picPath);
    let picBase64 = Buffer.from(pic).toString('base64');

    //console.log("PIC STRING: " + picBase64);
    return(picBase64);
}

module.exports = {get_league, show_all, create_league, delete_league, update_name, update_sport, update_profile_picture, storePhoto, encodePhoto}