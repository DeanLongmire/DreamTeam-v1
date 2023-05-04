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
        db.get_all(id, (name, ID, P_ID, sport, num_players, W, L) => {
            console.log(`${name} ${ID} ${P_ID} ${sport} ${num_players} ${W} ${L}`);
            const teamData = {
                name: name,
                id: ID,
                p_id: P_ID,
                sport: sport,
                nPlayers: num_players,
                w: W,
                l: L
            };
            JSON.stringify(teamData);
            res.send(teamData);
            db.close();
        });
    });
}

/*get team in league function(){
    get league id from param
    search db where p_id = league id (will have to make a db function for this)
    store all of these teams with their names, sport, W, L, numplayers maybe in a JSON object
    might need to have a count of all teams returned
}*/

// Diplay all teams in DB
const show_all = (req, res) => {
    get_path( (path) => {
        db.open(path);
        db.display_all( (teams) => {
            const data = {teams:teams}
            db.close();
            res.send(data);
        });
    });

    //res.send("Read all teams");
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
        db.insert(teamWid.teamName, teamWid.id, teamWid.P_ID, teamWid.creator,teamWid.sport, teamWid.size, 0, 0, null, () =>{
            db.close();
            console.log("HERE")
            const resData = {
                teamId: teamWid.id
            }
            res.status(200).send(resData);
        });
    });
}

// updating only name for a team
const update_team_name = (req, res) => {
    const { id } = req.params;
    const new_name = req.body.newName;

    console.log(new_name + " " + id);
    get_path((path) => {
        db.open(path);
        db.update_name(new_name, id, () => {
            db.close();
        });
    });

    res.send('Team name updated');
}

// updating only the sport that the team plays
const update_team_sport = (req, res) => {
    const { id } = req.params;
    const new_sport = req.body.new_sport;

    console.log(new_sport + " " + id);

    get_path((path) => {
        db.open(path);
        db.update_sport(new_sport, id, () => {
            db.close();
        });
    });
    res.send(`team sport updated. Their sport is now ${new_sport}`);
    console.log(`sport is now: ${new_sport}`);
}

// Updating amount of players on a given team in this function
const updatePlayerCount = (req, res) => {
    const { id } = req.params;
    const new_num_players = req.body.new_num_players;

    console.log(`Team with id: ${id} had ${new_num_players - id.num_players}`);
    console.log(`Team with id: ${id} NOW has new player count of ${new_num_players}`);

    db.open(db_path);
    db.update_num_players(id.name, newPcount, () => {
        db.close();
    });
    res.send('player count updated');
}

// Deletes a team from the database
const DeleteTeam = (req, res) => {
    const { id } = req.params;

    get_path( (path) => {
        db.open(path);
        db.delete(id, () => {
            db.close();
            res.send(`Team with the id ${id} deleted`);
        });
    });
}

const UpdateWins = (req, res) => {
    const {id} = req.params;
    const wins = req.body.W;
    
    console.log(`Team with id: ${id} now has ${wins} wins`);
    get_path((path) => {
        db.open(path);
        db.update_num_wins(wins, id, ()=> {
            db.close();
        });
    });
    res.send('Team wins updated');
}

const UpdateLosses = (req, res) => {
    const {id} = req.params;
    const losses = req.body.L;

    console.log(`Team with id: ${id} now has ${losses} losses`);

    get_path((path) => {
        db.open(path);
        db.update_num_losses(losses, id, () => {
            db.close();
        });
    });
    res.send('Team losses updated');
}

const SetA_ID = (req, res) => {
    const {id} = req.params;
    const adId = req.body.A_ID;
    get_path((path) => {
        db.open(path);
        db.SetAdminID(adId, id, () => {
            db.close();
        });
    });
    res.send('Team admin ID updated');
}

// function that creates the session with all the teams data
const createTeamSession = (req, res, teamJSON, callback) => {
    console.log('made it here 1');
    req.session.team = { 
        teamName: teamJSON.name,
        id: teamJSON.ID,
        p_id: teamJSON.P_ID,
        sport: teamJSON.sport,
        num_players: teamJSON.num_players,
        W: teamJSON.W,
        L: teamJSON.L
    };
    console.log('made it here 2');
    res.send('Showing Team Info');
    res.cookie('teamCookie' + teamJSON.id.substring(0,5), req.session.id);
    callback();
};

const update_profile_picture = (req, res) => {
    const { id } = req.params;
    const new_pp = req.body.pp;

    //console.log(new_pp + " " + id);

    storePhoto(new_pp, id, (picPath) => {
        get_path( (path) => {
            db.open(path);
            db.update_profile_picture(picPath,id, () => {
                db.close();
            });
    
            res.send('Picture updated');
        });
    })
}

const storePhoto = function(base64Encoded, id, callback) {
    const data = base64Encoded.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(data, 'base64');

    let picPath = "./DreamTeam/Back-End/Teams/profile_pictures/" + id + ".png";

    fs.writeFile(picPath, buffer, function(err) {
        if(err) {
            console.log(err);
        } else {
            //console.log("The file was saved!");
        }
    });

    callback(picPath);
}

const encodePhoto = function(picPath) {
    console.log(picPath)

    let pic = fs.readFileSync(picPath);
    let picBase64 = Buffer.from(pic).toString('base64');

    //console.log("PIC STRING: " + picBase64);
    return(picBase64);
}

module.exports = {
    get_team,
    show_all,
    create_team,
    update_team_name,
    update_team_sport,
    updatePlayerCount,
    DeleteTeam,
    UpdateWins,
    UpdateLosses,
    createTeamSession,
    SetA_ID,
    storePhoto,
    encodePhoto,
    update_profile_picture
}