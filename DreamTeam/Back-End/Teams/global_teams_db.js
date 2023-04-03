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
        this.db.run('CREATE TABLE Teams(name, ID, P_ID, sport, num_players, W, L)', (err)=>{
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
    insert(name, ID, P_ID, sport, num_players, W, L, callback){
        this.sql = 'INSERT INTO Teams (name, ID, P_ID, sport, num_players, W, L) VALUES(?, ?, ?, ?, ?, ?, ?)';
        this.db.run(this.sql, [name, ID, P_ID, sport, num_players, W, L], (err)=>{
            if(err){return console.error(err.message);}
            console.log('New row created in Team table')
        });
        callback();
    };
    display_all(){
        this.sql = 'SELECT * FROM Teams';
        this.db.all(this.sql, [], (err,rows)=>{
            if(err) {
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                console.log(row);
            });
        });
    };
    update_name(name, new_name){
        this.data = [new_name, name];
        this.sql = 'UPDATE Teams SET name = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) name updated');
        });
    };
    update_sport(name, new_sport){
        this.data = [new_sport, name];
        this.sql = 'UPDATE Teams SET sport = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) sport updated');
        });
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
    update_num_wins(name, newNumWins){
        this.data = [newNumWins, name];
        this.sql = 'UPDATE Teams SET W = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) wins updated');
        });
    };
    update_num_losses(name, newNumLosses){
        this.data = [newNumLosses, name];
        this.sql = 'UPDATE Teams SET L = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) losses updated');
        });
    }
}

module.exports.team_dbmanager = team_dbmanager;