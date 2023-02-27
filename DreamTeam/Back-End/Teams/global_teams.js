//This is the V1 test file for creating, updating, and deleting Teams from
//the SQLite3 ../database.db 
const sqlite3 = require('sqlite3').verbose();

class team_dbmanager{
    constructor(db, sql, data){};
    open(){
        this.db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    };
    create(){
        this.db.run('CREATE TABLE Teams(name, ID, parent_name, parent_ID, sport)', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Created team table');
        });
    };
    drop(){
        this.db.run('DROP TABLE Team', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Dropped team table')
        });
    };
    insert(){};
    display_all(){};
    update_name(){};
    delete(){};
    close(){
        this.db.close((err) => {
            if(err){
                return console.error(err.message);
            }
            console.log('Database Closed.');
        });
    };
}

module.exports.team_dbmanager = team_dbmanager;