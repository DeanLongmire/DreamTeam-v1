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
            db.close();

            let data = {
                username: username,
                id: ID,
                teamId: Team_ID,
                pos: position
            }

            res.send(data);
        });
    });
}

const get_players_on_team = (req, res) => {
    const { teamId } = req.params;

    get_path((path) => {
        db.open(path);
        db.get_players_on_team(teamId,(usernames,positions,ids,TDs,catches,tackles,goals,saves,hits,RBIs,errors) => {
            db.close();
            const players = {
                usernames: usernames,
                positions: positions,
                ids: ids,
                TDs: TDs,
                catches: catches,
                tackles: tackles,
                goals: goals,
                saves: saves,
                hits: hits,
                RBIs: RBIs,
                errors: errors
            }
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

const increment_TD = (id, newTDs, callback) => {
    if(newTDs == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_TD(newTDs,id,() => {
                callback();
            })
        })
    }
}

const increment_catches = (id, newCatches, callback) => {
    if(newCatches == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_catches(newCatches,id,() => {
                callback();
            })
        })
    }
}

const increment_tackles = (id, newTackles, callback) => {
    if(newTackles == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_tackles(newTackles,id,() => {
                callback();
            })
        })
    }
}

const increment_goals = (id, newGoals, callback) => {
    if(newGoals == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_goals(newGoals,id,() => {
                callback();
            })
        })
    }
}

const increment_saves = (id, newSaves, callback) => {
    if(newSaves == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_saves(newSaves,id,() => {
                callback();
            })
        })
    }
}

const increment_hits = (id, newHits, callback) => {
    if(newHits == undefined) {callback();}
    else
    {
        console.log(newHits);
        get_path((path) => {
            //db.open(path);
            db.increment_hits(newHits,id,() => {
                callback();
            })
        })
    }
}

const increment_RBIs = (id, newRBIs, callback) => {
    if(newRBIs == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_RBIs(newRBIs,id,() => {
                callback();
            })
        })
    }
}

const increment_errors = (id, newErrors, callback) => {
    if(newErrors == undefined) {callback();}
    else
    {
        get_path((path) => {
            //db.open(path);
            db.increment_errors(newErrors,id,() => {
                callback();
            })
        })
    }
}

const promise_stats = (id, newStats, callback) => {
    //About to be callback hell but oh well, gotta do what ya gotta do
    increment_TD(id,newStats.TDs,() => {
        increment_catches(id,newStats.catches,() => {
            increment_tackles(id,newStats.tackles,() => {
                increment_goals(id,newStats.goals,() => {
                    increment_saves(id,newStats.saves,() => {
                        increment_hits(id,newStats.hits,() => {
                            increment_RBIs(id,newStats.RBIs,() => {
                                increment_errors(id,newStats.errors,() => {
                                    callback();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

const increment_stats = (req, res) => {
    const { id } = req.params;
    const newStats = req.body;

    console.log("\n\nSTART\n");

    get_path((path) => {
        db.open(path);
        promise_stats(id,newStats,() => {
            db.close();
            res.send("Stats Incremented");
        });
    })
}

module.exports = {get_player, get_players_on_team, show_all, create_player, delete_player, update_name, update_position, increment_stats}