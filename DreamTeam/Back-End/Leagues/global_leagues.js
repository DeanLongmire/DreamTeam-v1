//Primary Contributer: Ryan Carnes - rcarnes - Ryan-Carnes-01
//This is the V1 test file for creating, updating, and deleting Leagues from
//the SQLite3 ../database.db 
//Integration with other systems will be handled once prelimenary proof-of-concept
//functionality is implemented 

//Requires
const sqlite3 = require('sqlite3').verbose();

//Class for portability/simplicity of use between files (need to make module export)
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

//let league_db = new league_dbmanager();

//league_db.open();

//league_db.create();
//league_db.insert("UTKFF", 1, "Flag Football");
//league_db.insert("UTKS", 2, "Soccer");
//league_db.insert("UTKBB", 3, "Basketball");
//league_db.insert("UTKT", 4, "Tennis");
//league_db.insert("UTKBB2", 5, "Basketball");
//league_db.update_sport("UTKBB", "Archery");
//league_db.update_name("UTKBB2", "NBA-Official");
//league_db.delete("UTKFF");
//league_db.display_all();
//league_db.drop();

//league_db.close();
