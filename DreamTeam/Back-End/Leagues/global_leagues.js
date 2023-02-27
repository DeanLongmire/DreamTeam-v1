//Primary Contributer: Ryan Carnes - rcarnes - Ryan-Carnes-01
//This is the V1 test file for creating, updating, and deleting Leagues from
//the SQLite3 ../database.db 
//Integration with other systems will be handled once prelimenary proof-of-concept
//functionality is implemented 

//TODO - make insert/update/display/delete take parameters for their functionality

//Requires
const sqlite3 = require('sqlite3').verbose();

//Class for portability/simplicity between files
class league_dbmanager{
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
    insert(){
        this.sql = 'INSERT INTO Leagues (name, ID, sport) VALUES(?,?,?)';
        this.db.run(this.sql, ["UTKFF", 1, "Flag Football"], (err)=>{
            if(err) {return console.error(err.message);}
            console.log("New row created in League table");
        });
    }
    display(){
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
    update(){
        this.data = ['Soccer', 'Flag Football'];
        this.sql = 'UPDATE Leagues SET sport = ? WHERE sport = ?';
        this.db.run(this.sql, this.data, (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) updated');
        });
    }
    delete(){
        this.data = ['Soccer'];
        this.sql = 'DELETE FROM Leagues WHERE sport = ?';
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



let league_db = new league_dbmanager();

league_db.open();

//league_db.create();
//league_db.insert();
//league_db.update();
//league_db.delete();
//league_db.display();
//league_db.drop();

league_db.close();
