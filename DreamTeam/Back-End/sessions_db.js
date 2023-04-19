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

    //create a session
    create_session(ID,user,callback)
    {
        this.db.serialize(() => {
            this.sql = 'INSERT INTO sessions (sid, sess) VALUES(?,?)'
            this.db.run(this.sql, [ID, user], (err)=>{
              if(err){return console.log(err.message)}
            })
            callback();
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
        console.log("Again, Looking for session " + ID);
        this.db.get(this.sql, [ID], (err, row) => {
            if(err) {
              return console.error(err.message);
            }
            if(row) {
                const sessObj = JSON.parse(row.sess);
                callback(sessObj);
            } 
            else {
              const errObj = JSON.parse(row.sess);
              console.log(errObj);
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

/*let db = new sessions_dbmanager();

const testJSON = {
    id: "bada0bad-8d75-4329-9621-f5dce3cc4b00",
    username: "username",
    firstName: "firstName",
    lastName: "lastName",
    playerID: "6a3ffa53-a864-418c-9bea-18136033c4d7",
    teamID: "124d3b1e-fa03-4705-be8f-c9f1fefaa90a",
    pos: "POS",
    bio: "bio",
    profilePicture: null
};

const passJSON = JSON.stringify(testJSON);

db.open("./sessions.db");
db.create_session(10,passJSON, () => {
    db.get_session(10, (user) => {
        console.log(user.firstName);
        db.close();
    })
})*/

module.exports.sessions_dbmanager = sessions_dbmanager;