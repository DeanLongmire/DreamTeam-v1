const sqlite3 = require('sqlite3').verbose();

class player_dbmanager{
    constructor(db, sql, data){}
    open(path){
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    }
    create(){
        this.db.run('CREATE TABLE Players(name, username, ID, Team_ID, position, TDs, catches, tackles, goals, saves, hits, RBIs, errors)', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Created player table');
        }); 
    }
    drop(){
        this.db.run('DROP TABLE Players', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Dropped player table')
        });
    }
    insert(name, username, ID, Team_ID, position, TDs, catches, tackels, goals, saves, hits, RBIs, errors, callback){
        this.db.serialize(() => {
            this.sql = 'INSERT INTO Players(name, username, ID, Team_ID, position, TDs, catches, tackles, goals, saves, hits, RBIs, errors) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
            this.db.run(this.sql, [name, username, ID, Team_ID, position, TDs, catches, tackels, goals, saves, hits, RBIs, errors], (err)=>{
                if(err) {return console.error(err.message);}
                console.log("New row created in Player table");
            });
            callback();
        });
    }
    display_all(callback){
        this.db.serialize(()=>{
            this.sql = 'SELECT * FROM Players';
            this.db.all(this.sql, [], (err,rows)=>{
                if(err) {return console.error(err.message);}
                rows.forEach((row)=>{
                    console.log(row);
                });
            });
            callback();
        });
    }
    get_all(ID, callback){
        this.db.serialize(()=>{
            this.sql = 'SELECT * FROM Players WHERE ID = ?';
            this.db.get(this.sql, [ID], (err, row) => {
                if(err){return console.error(err.message);}
                if(row){callback(row.name,row.username,row.ID,row.Team_ID,row.position,row.TDs,row.catches,row.tackles,row.goals,row.saves,row.hits,row.RBIs,row.errors);}
                else{console.log("error");}
            });
            callback();
        });
    }
    get_players_on_team(teamId, callback){
        let usernames = [];
        let positions = [];
        let ids = [];
        let TDs = [];
        let catches = [];
        let tackles = [];
        let goals = [];
        let saves = [];
        let hits = [];
        let RBIs = [];
        let errors = [];
        this.db.serialize(()=>{
            this.sql = 'SELECT * FROM Players WHERE Team_ID = ?';
            this.db.all(this.sql,[teamId],(err,rows) => {
                if(err){return console.error(err.message);}
                if(rows.length === 0) {callback("No players");}
                else if(rows) {
                    rows.forEach((row) => {
                        usernames.push(row.username);
                        positions.push(row.position);
                        ids.push(row.ID);
                        TDs.push(row.TDs);
                        catches.push(row.catches);
                        tackles.push(row.tackles);
                        goals.push(row.goals);
                        saves.push(row.saves);
                        hits.push(row.hits);
                        RBIs.push(row.RBIs);
                        errors.push(row.errors);
                    });
                    callback(usernames,positions,ids,TDs,catches,tackles,goals,saves,hits,RBIs,errors);
                }
            });
        });
    }
    update_name(new_name, ID, callback){
        this.db.serialize(()=>{ 
            this.data = [new_name, ID];
            this.sql = 'UPDATE Players SET name = ? WHERE ID = ?';
            this.db.run(this.sql, this.data, (err)=>{
                if(err){return console.log(err.message);}
                console.log('Row(s) name updated');
            });
            callback();
        });
    }
    update_position(new_position, ID, callback){
        this.db.serialize(()=>{ 
            this.data = [new_position, ID];
            this.sql = 'UPDATE Players SET position = ? WHERE ID = ?';
            this.db.run(this.sql, this.data, (err)=>{
                if(err){return console.log(err.message);}
                console.log('Row(s) position updated');
            });
            callback();
        });
    }
    increment_TD(TDs, ID, callback){
        let updatedTDs;
        this.db.serialize(()=>{ 
            this.db.get('SELECT TDs FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.TDs !== null)
                {
                    updatedTDs = row.TDs + TDs;
                    this.db.run('UPDATE Players SET TDs = ? WHERE ID = ?',[updatedTDs,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_catches(catches, ID, callback){
        let updatedCatches;
        this.db.serialize(()=>{ 
            this.db.get('SELECT catches FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.catches !== null)
                {
                    updatedCatches = row.catches + catches;
                    this.db.run('UPDATE Players SET catches = ? WHERE ID = ?',[updatedCatches,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_tackles(tackles, ID, callback){
        let updatedTackles;
        this.db.serialize(()=>{ 
            this.db.get('SELECT tackles FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.tackles !== null)
                {
                    updatedTackles = row.tackles + tackles;
                    this.db.run('UPDATE Players SET tackles = ? WHERE ID = ?',[updatedTackles,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_goals(goals, ID, callback){
        let updatedGoals;
        this.db.serialize(()=>{ 
            this.db.get('SELECT goals FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.goals !== null)
                {
                    updatedGoals = row.goals + goals;
                    this.db.run('UPDATE Players SET goals = ? WHERE ID = ?',[updatedGoals,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_saves(saves, ID, callback){
        let updateSaves;
        this.db.serialize(()=>{ 
            this.db.get('SELECT saves FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.saves !== null)
                {
                    updateSaves = row.saves + saves;
                    this.db.run('UPDATE Players SET saves = ? WHERE ID = ?',[updateSaves,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_hits(hits, ID, callback){
        let updateHits;
        this.db.serialize(()=>{ 
            this.db.get('SELECT hits FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.hits !== null)
                {
                    updateHits = row.hits + hits;
                    this.db.run('UPDATE Players SET hits = ? WHERE ID = ?',[updateHits,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_RBIs(RBIs, ID, callback){
        let updateRBIs;
        this.db.serialize(()=>{ 
            this.db.get('SELECT RBIs FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.RBIs !== null)
                {
                    updateRBIs = row.RBIs + RBIs;
                    this.db.run('UPDATE Players SET RBIs = ? WHERE ID = ?',[updateRBIs,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    increment_errors(errors, ID, callback){
        let updateErrors;
        this.db.serialize(()=>{ 
            this.db.get('SELECT errors FROM Players WHERE ID = ?',[ID],(err,row) => {
                if(err)
                {
                    console.log(err.message);
                    return;
                }
                if(row.errors !== null)
                {
                    updateErrors = row.errors + errors;
                    this.db.run('UPDATE Players SET errors = ? WHERE ID = ?',[updateErrors,ID],(err) => {
                        if(err)
                        {
                            console.log(err.message)
                            return;
                        }
                        else
                        {
                            callback();
                        }
                    });
                }
            });
        });
    }
    delete(ID, callback){
        this.db.serialize(()=>{ 
            this.sql = 'DELETE FROM Players WHERE ID = ?';
            this.db.run(this.sql, [ID], (err)=>{
                if(err){return console.log(err.message);}
                console.log('Row(s) deleted')
            });
            callback();
        });
    }
    close(){
        this.db.close((err) => {
            if(err){
                return console.error(err.message);
            }
            console.log('Database Closed.');
        });
    }
}

//db.drop();
//db.create();
//db.close();

module.exports.player_dbmanager = player_dbmanager;