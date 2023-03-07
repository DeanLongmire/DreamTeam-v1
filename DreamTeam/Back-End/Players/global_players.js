const sqlite3 = require('sqlite3').verbose();

class player_dbmanager{
    constructor(db, sql, data){}
    open(){
        this.db = new sqlite3.Database('../database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    }
    create(){
        this.db.run('CREATE TABLE Players(name, username, ID, P_ID, position)', (err)=>{
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
    insert(name, username, ID, P_ID, position){
        this.sql = 'INSERT INTO Players (name, username, ID, P_ID, position) VALUES(?,?,?,?,?)';
        this.db.run(this.sql, [name, username, ID, P_ID, position], (err)=>{
            if(err) {return console.error(err.message);}
            console.log("New row created in Player table");
        });
    }
    display_all(){
        this.sql = 'SELECT * FROM Players';
        this.db.all(this.sql, [], (err,rows)=>{
            if(err) {
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                console.log(row);
            });
        });
    }
    update_position(name, new_position){
        this.data = [new_position, name];
        this.sql = 'UPDATE Players SET position = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) position updated');
        });
    }
    update_name(name, new_name){
        this.data = [new_name, name];
        this.sql = 'UPDATE Players SET name = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) name updated');
        });
    }
    delete(name){
        this.data = [name];
        this.sql = 'DELETE FROM Players WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) deleted')
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

module.exports.player_dbmanager = player_dbmanager;