//Requires
const sqlite3 = require('sqlite3').verbose();

class users_dbmanager{
    constructor(db, sql, data){};
    open(){
        this.db = new sqlite3.Database('../database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message);
            }
            console.log('Connected to SQLite database.db');
        });
    };
    create(){
        this.db.run('CREATE TABLE Users(ID INT, user_name TEXT, email TEXT, password TEXT, firs_name TEXT, last_name TEXT, bio TEXT, pos TEXT, profile_picture BLOB)', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Created User table');
        });
    };
    drop(){
        this.db.run('DROP TABLE Users', (err)=>{
            if(err){return console.error(err.message);}
            console.log('Dropped User table')
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

driver = new users_dbmanager();
driver.open();
driver.create();

module.exports.users_dbmanager = users_dbmanager;