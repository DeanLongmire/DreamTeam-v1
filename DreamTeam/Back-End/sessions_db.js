//Requires
const sqlite3 = require('sqlite3').verbose()

//DB class - use for interacting with database
class sessions_dbmanager{
    constructor(db, sql, data){}

    //opens the database
    open(path){
        console.log("opening " + path);
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message)
            }
            console.log("Connected to sessions.db");
        })
    }

    //deletes a session
    delete_session(ID, callback){
        this.sql = 'DELETE FROM sessions WHERE sid = ?'

        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
    }

    //gets a session and returns the sess data
    get_session(ID, callback){
        this.sql = 'SELECT * FROM sessions WHERE sid = ?';
        this.db.get(this.sql, [ID], (err, row) => {
            if(err) {
              return console.error(err.message);
            }
            if(row) {
              callback(row.sess);
            } 
            else {
              console.log("error");
              }
          });
    }
    
    //closes the database
    close(){
        this.db.close((err) => {
            if(err){
                return console.error(err.message)
            }
            console.log('Database Closed.')
        })
    }
}

module.exports.users_dbmanager = users_dbmanager