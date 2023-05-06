const sqlite3 = require('sqlite3').verbose();

class league_dbmanager{
    constructor(db, sql, data){}
    open(path, callback){
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to Leagues SQLite database.db');
            if(callback) callback();
        });
    }
    create(){
        this.db.run('CREATE TABLE Leagues(name, ID, adminID, sport)', (err)=>{
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
    insert(name, ID, adminID, sport, callback){
        this.db.serialize(() => {
            this.sql = 'INSERT INTO Leagues (name, ID, adminID, sport) VALUES(?,?,?,?)';
            this.db.run(this.sql, [name, ID, adminID, sport], (err)=>{
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("New row created in League table");
                }
            });
            callback();
        });
    }
    display_all(callback){
        const league_names = [];
        const league_sports = [];
        this.db.serialize(()=>{ 
            this.sql = 'SELECT name,sport FROM Leagues';
            this.db.all(this.sql, [], (err,rows)=>{
                if(err) {return console.error(err.message);}
                rows.forEach((row)=>{
                    console.log(row.name);
                    console.log(row.sport);
                    league_names.push(row.name);
                    league_sports.push(row.sport);
                });
                callback(league_names,league_sports);
            });
        });
    }
    get_all(ID, callback){
        this.db.serialize(()=>{
            this.sql = 'SELECT * FROM Leagues WHERE ID = ?';
            this.db.get(this.sql, [ID], (err, row) =>{
                if(err){return console.error(err.message);}
                if(row){
                    callback(row.name,row.ID,row.adminID,row.sport);
                    console.log("HERE");
                }
                else{console.log("error");}
            });
        });
    }
    update_sport(new_sport, ID, callback){
        this.db.serialize(()=>{ 
            this.sql = 'UPDATE Leagues SET sport = ? WHERE ID = ?';
            this.db.run(this.sql, [new_sport, ID], (err)=>{
                if(err){return console.log(err.message);}
            });
            callback();
        });
    }
    update_name(new_name, ID, callback){
        this.db.serialize(()=>{ 
            this.sql = 'UPDATE Leagues SET name = ? WHERE ID = ?';
            this.db.run(this.sql, [new_name, ID], (err)=>{
                if(err){return console.log(err.message);}
                console.log('Row(s) name updated');
            });
            callback();
        });
    }
    delete(ID, callback){
        this.db.serialize(()=>{ 
            this.sql = 'DELETE FROM Leagues WHERE ID = ?';
            this.db.run(this.sql, [ID], (err)=>{
                if(err){return console.log(err.message);}
                console.log('League Row(s) deleted')
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

module.exports.league_dbmanager = league_dbmanager;
