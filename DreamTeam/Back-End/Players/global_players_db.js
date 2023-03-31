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
    insert(name, username, ID, Team_ID, position, callback){
        this.db.serialize(() => {
            this.sql = 'INSERT INTO Players (name, username, ID, Team_ID, position) VALUES(?,?,?,?,?)';
            this.db.run(this.sql, [name, username, ID, Team_ID, position], (err)=>{
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
                if(row){callback(row.name,row.username,row.ID,row.Team_ID,row.position);}
                else{console.log("error");}
            });
            callback();
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

module.exports.player_dbmanager = player_dbmanager;