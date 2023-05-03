const { call } = require('function-bind');

/*This is the V1 test file for creating, updating, and deleting Teams from
the SQLite3 ../database.db 
see links-to-resources 1, 2, & 4*/
const sqlite3 = require('sqlite3').verbose();

class team_dbmanager{
    constructor(db, sql, data){};
    open(path){
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    };
    create(){
        this.db.run('CREATE TABLE Teams(name, ID, P_ID, A_ID,sport, num_players, W, L, profile_picture)', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Created team table');
        });
    };
    drop(){
        this.db.run('DROP TABLE Teams', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Dropped team table')
        });
    };
    insert(name, ID, P_ID, A_ID, sport, num_players, W, L, profile_picture, callback){
        this.sql = 'INSERT INTO Teams (name, ID, P_ID, A_ID, sport, num_players, W, L) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        this.db.run(this.sql, [name, ID, P_ID, A_ID, sport, num_players, W, L, profile_picture], (err)=>{
            if(err){return console.error(err.message);}
            console.log('New row created in Team table')
        });
        callback();
    };
    display_all(callback){
        const teams = [];
        this.db.serialize(() => {
            this.sql = 'SELECT name FROM Teams';
            this.db.all(this.sql, [], (err,rows)=>{
                if(err) {
                    return console.error(err.message);
                }
                rows.forEach((row)=>{
                    console.log(row);
                    teams.push(row.name);
                });
                callback(teams);
            });
        });
    };
    update_name(new_name, ID, callback){
        this.data = [new_name, ID];
        this.sql = 'UPDATE Teams SET name = ? WHERE ID = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log(new_name);
            console.log('Row(s) name updated');
        });
        callback();
    };
    update_sport(new_sport, ID, callback){
        this.data = [new_sport, ID];
        this.sql = 'UPDATE Teams SET sport = ? WHERE ID = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log(`In teams_db.js: Sport is ${new_sport}`);
            console.log('Row(s) sport updated');
        });
        callback();
    };
    update_num_players(name, new_num_players){
        this.data = [new_num_players, name];
        this.sql = 'UPDATE Teams SET num_players = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) sport updated');
        });
    };
    delete(id, callback){
        this.data = [id];
        this.sql = 'DELETE FROM Teams WHERE id  = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) deleted')
        });
        callback();
    };
    close(){
        this.db.close((err) => {
            if(err){
                return console.error(err.message);
            }
            console.log('Database Closed.');
        });
    };
    update_num_wins(newNumWins, ID, callback){
        this.data = [newNumWins, ID];
        this.sql = 'UPDATE Teams SET W = ? WHERE ID = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) wins updated');
        });
        callback();
    };
    update_num_losses(newNumLosses, ID, callback){
        this.data = [newNumLosses, ID];
        this.sql = 'UPDATE Teams SET L = ? WHERE ID = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) losses updated');
        });
        callback();
    }
    get_all(ID, callback){
        this.sql = 'SELECT * FROM Teams WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
        if(err){
            return console.error(err.message);
        }
        if(row){
            callback(row.name,row.ID,row.P_ID,row.A_ID,row.sport,row.num_players,row.W,row.L, row.profile_picture);
        }
        else{
            console.log("error");
        }
        });
    }
    SetAdminID(A_ID, ID, callback){
        this.data = [A_ID, ID];
        this.sql = 'UPDATE Teams SET A_ID = ? WHERE ID = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) A_ID updated');
        });
        callback();
    }
    update_profile_picture(new_pp, ID, callback){
        this.sql = "UPDATE Teams SET profile_picture = ? WHERE ID = ?"
        this.db.run(this.sql, [new_pp, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
      }
}

module.exports.team_dbmanager = team_dbmanager;