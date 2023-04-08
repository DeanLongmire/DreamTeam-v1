//Requires
const sqlite3 = require('sqlite3').verbose()

//DB class - use for interacting with database
class users_dbmanager{
    constructor(db, sql, data){}

    //opens the database
    open(path){
        console.log("opening " + path);
        this.db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message)
            }
            console.log("Connected to database.db");
        })
    }

    //creates the table 'Users'
    create(){
        this.db.run('CREATE TABLE Users(ID INT, user_name TEXT, email TEXT, password TEXT, first_name TEXT, last_name TEXT, bio TEXT, pos TEXT, profile_picture BLOB)', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Created User table')
        })
    }

    //deletes the table 'Users'
    drop(){
        this.db.run('DROP TABLE Users', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Dropped User table')
        })
    }

    //inserts into the table
    insert(id, un, email, password, fn, ln, bio, pos, pp, callback){
        this.db.serialize(() => {
          this.sql = 'INSERT INTO Users (ID, user_name, email, password, first_name, last_name, bio, pos, profile_picture) VALUES(?,?,?,?,?,?,?,?,?)'
          this.db.run(this.sql, [id, un, email, password, fn, ln, bio, pos, pp], (err)=>{
            if(err){return console.log(err.message)}
          })
          callback();
        })
    }

    //displays all users in database to the console
    display_all(callback){
        this.sql = 'SELECT * FROM Users'

        this.db.all(this.sql, [], (err,rows)=>{
            if(err){return console.error(err.message)}
            console.log("")
            rows.forEach((row)=>{
                console.log(`${row.ID} ${row.first_name} ${row.last_name} - ${row.email} - ${row.user_name} : ${row.password} - ${row.bio} - ${row.pos}`)
            })
            console.log("")
            console.log('End of Users Table')
            callback()
        })
    }

    //gets a user's ID
    get_ID(email, callback) {
        this.sql = 'SELECT password, ID FROM Users WHERE email = ?';
        this.db.get(this.sql, [email], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.password,row.ID);
          }
          else {
            callback(null, null);
          }
        });
    }

    //gets a user's first name
    get_fn(ID, callback) {
        this.sql = 'SELECT first_name FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.first_name);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets a user's last name
    get_ln(ID, callback) {
        this.sql = 'SELECT last_name FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.last_name);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets a user's email
    get_email(ID, callback) {
        this.sql = 'SELECT email FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.email);
          } 
          else {
            console.log("error");
          }
        });
        callback();
    }

    //gets a user's username
    get_user_name(ID, callback) {
        this.sql = 'SELECT user_name FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.user_name);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets a user's password
    get_password(ID, callback) {
        this.sql = 'SELECT password FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.password);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets a user's position
    get_position(ID, callback) {
        this.sql = 'SELECT pos FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.pos);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets a user's bio
    get_bio(ID, callback) {
        this.sql = 'SELECT bio FROM Users WHERE ID = ?';
        this.db.get(this.sql, [ID], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.bio);
          } 
          else {
            console.log("error");
          }
        });
    }

    //gets all of a user's information
    get_all(ID, callback) {
      this.sql = 'SELECT * FROM Users WHERE ID = ?';
      this.db.get(this.sql, [ID], (err, row) => {
        if(err) {
          return console.error(err.message);
        }
        if(row) {
          callback(row.user_name,row.first_name,row.last_name,row.email,row.bio,row.pos);
        } 
        else {
          console.log("error");
          }
      });
    }

    //updates a user's username
    update_user_name(new_user_name, ID, callback){
        this.sql = "UPDATE Users SET user_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_user_name, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
    }

    //updates a user's firstname
    update_first_name(new_fn, ID){
        this.sql = "UPDATE Users SET first_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_fn, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
    }

    //updates a user's lastname
    update_last_name(new_ln, ID, callback){
        this.sql = "UPDATE Users SET last_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_ln, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
    }

    //updates a user's email
    update_email(new_email, ID, callback){
        this.sql = "UPDATE Users SET email = ? WHERE ID = ?"
        this.db.run(this.sql, [new_email, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
    }

    //updates a user's position
    update_pos(new_pos, ID){
        this.sql = "UPDATE Users SET pos = ? WHERE ID = ?"
        this.db.run(this.sql, [new_pos, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
    }

    //updates a user's bio
    update_bio(new_bio, ID, callback){
        this.sql = "UPDATE Users SET bio = ? WHERE ID = ?"
        this.db.run(this.sql, [new_bio, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
    }

    //updates a user's password
    update_password(new_password, ID){
        this.sql = "UPDATE Users SET password = ? WHERE ID = ?"
        this.db.run(this.sql, [new_password, ID], (err)=>{
            if(err){return console.log(err.message)}
        })
    }

    //deletes a user from table 'Users'
    delete_user(ID, callback){
        this.sql = 'DELETE FROM Users WHERE ID = ?'

        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message)}
        })
        callback();
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