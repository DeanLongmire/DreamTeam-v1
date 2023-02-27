/*This is the V1 test file for creating, updating, and deleting Leagues from
the SQLite3 ../database.db 
see links-to-resources 1, 2, & 4*/
const sqlite3 = require('sqlite3').verbose();

class league_dbmanager{
    constructor(db, sql, data){}
    open(){
        this.db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    }
    create(){
        this.db.run('CREATE TABLE Leagues(name, ID, sport)', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Created league table');
        }); 
    }
    drop(){
        this.db.run('DROP TABLE Leagues', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Dropped league table')
        });
    }
    insert(name, ID, sport){
        this.sql = 'INSERT INTO Leagues (name, ID, sport) VALUES(?,?,?)';
        this.db.run(this.sql, [name, ID, sport], (err)=>{
            if(err) {return console.error(err.message);}
            console.log("New row created in League table");
        });
    }
    display_all(){
        this.sql = 'SELECT * FROM Leagues';
        this.db.all(this.sql, [], (err,rows)=>{
            if(err) {
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                console.log(row);
            });
        });
    }
    update_sport(name, new_sport){
        this.data = [new_sport, name];
        this.sql = 'UPDATE Leagues SET sport = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) sport updated');
        });
    }
    update_name(name, new_name){
        this.data = [new_name, name];
        this.sql = 'UPDATE Leagues SET name = ? WHERE name = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) name updated');
        });
    }
    delete(name){
        this.data = [name];
        this.sql = 'DELETE FROM Leagues WHERE name = ?';
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

module.exports.league_dbmanager = league_dbmanager;
