/*This is the V1 test file for creating, updating, and deleting Leagues from
the SQLite3 ../database.db 
see links-to-resources 1, 2, & 4*/
const sqlite3 = require('sqlite3').verbose();

class league_dbmanager{
    constructor(db, sql, data){}
    open(path){
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
    insert(name, ID, sport, callback){
        this.db.serialize(() => {
            this.sql = 'INSERT INTO Leagues (name, ID, sport) VALUES(?,?,?)';
            this.db.run(this.sql, [name, ID, sport], (err)=>{
                if(err) {return console.error(err.message);}
                console.log("New row created in League table");
            });
            callback();
        });
    }
    display_all(callback){
        this.sql = 'SELECT * FROM Leagues';
        this.db.all(this.sql, [], (err,rows)=>{
            if(err) {return console.error(err.message);}
            console.log("");
            rows.forEach((row)=>{
                console.log(row);
            });
            console.log("");
            console.log('End of League Table');
            callback();
        });
    }
    get_all(ID, callback){
        this.sql = 'SELECT * FROM Leagues WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) =>{
            if(err){return console.error(err.message);}
            if(row){callback(row.name,row.sport);}
            else{console.log("error");}
        });
    }
    update_sport(new_sport, ID, callback){
        this.sql = 'UPDATE Leagues SET sport = ? WHERE ID = ?';
        this.db.run(this.sql, [new_sport, ID], (err)=>{
            if(err){return console.log(err.message);}
        });
        callback();
    }
    update_name(new_name, ID, callback){
        this.sql = 'UPDATE Leagues SET name = ? WHERE ID = ?';
        this.db.run(this.sql, [new_name, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Row(s) name updated');
        });
        callback();
    }
    delete(ID){
        this.sql = 'DELETE FROM Leagues WHERE ID = ?';
        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('League Row(s) deleted')
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
