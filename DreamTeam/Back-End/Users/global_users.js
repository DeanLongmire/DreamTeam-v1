//Requires
const sqlite3 = require('sqlite3').verbose()

class users_dbmanager{
    constructor(db, sql, data){}

    open(){
        this.db = new sqlite3.Database('../database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message)
            }
            console.log('Connected to SQLite database.db')
        })
    }

    create(){
        this.db.run('CREATE TABLE Users(ID INT, user_name TEXT, email TEXT, password TEXT, first_name TEXT, last_name TEXT, bio TEXT, pos TEXT, profile_picture BLOB)', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Created User table')
        })
    }

    drop(){
        this.db.run('DROP TABLE Users', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Dropped User table')
        })
    }

    insert(ID, un, email, password, fn, ln, bio, pos, pp){
        this.sql = 'INSERT INTO Users (ID, user_name, email, password, first_name, last_name, bio, pos, profile_picture) VALUES(?,?,?,?,?,?,?,?,?)'
        this.db.run(this.sql, [ID, un, email, password, fn, ln, bio, pos, pp], (err)=>{
            if(err){return console.log(err.message)}
            console.log('New row created in Users table')
        })
    }

    display_all(){
        this.sql = 'SELECT * FROM Users'

        this.db.all(this.sql, [], (err,rows)=>{
            if(err){return console.error(err.message)}
            console.log("")
            rows.forEach((row)=>{
                console.log(`${row.ID} ${row.first_name} ${row.last_name} - ${row.email} - ${row.user_name} : ${row.password} - ${row.bio} - ${row.pos}`)
            })
            console.log("")
            console.log('End of Users Table')
        })
    }

    /* SACRED CODE. DO NOT TOUCH. I HAVE NO IDEA HOW IT WORKS */
    get_ID(user_name, callback) {
        this.sql = 'SELECT password, ID FROM Users WHERE user_name = ?';
        this.db.get(this.sql, [user_name], (err, row) => {
          if(err) {
            return console.error(err.message);
          }
          if(row) {
            callback(row.password,row.ID);
          }
          else {
            console.log("error");
          }
        });
    }

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

    update_user_name(new_user_name, ID){
        this.sql = "UPDATE Users SET user_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_user_name, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('User Name updated')
        })
    }

    update_first_name(new_fn, ID){
        this.sql = "UPDATE Users SET first_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_fn, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('First Name updated')
        })
    }

    update_last_name(new_ln, ID){
        this.sql = "UPDATE Users SET last_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_ln, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Last Name updated')
        })
    }

    update_email(new_email, ID){
        this.sql = "UPDATE Users SET email = ? WHERE ID = ?"
        this.db.run(this.sql, [new_email, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Email updated')
        })
    }

    update_pos(new_pos, ID){
        this.sql = "UPDATE Users SET pos = ? WHERE ID = ?"
        this.db.run(this.sql, [new_pos, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Position updated')
        })
    }

    update_bio(new_bio, ID){
        this.sql = "UPDATE Users SET bio = ? WHERE ID = ?"
        this.db.run(this.sql, [new_bio, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Bio updated')
        })
    }

    update_password(new_password, ID){
        this.sql = "UPDATE Users SET password = ? WHERE ID = ?"
        this.db.run(this.sql, [new_password, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Password updated')
        })
    }

    delete_user(ID){
        this.sql = 'DELETE FROM Users WHERE ID = ?'

        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Deleted a user from the table')
        })
    }
    
    close(){
        this.db.close((err) => {
            if(err){
                return console.error(err.message)
            }
            console.log('Database Closed.')
        })
    }
}

let driver = new users_dbmanager()
let fn
let id
let successfullLogin
let attempt = "password"

driver.open()

driver.get_fn(1, (first_name) => {fn = first_name});

driver.get_ID("Deanathan",(pswd,ID) => {
    successfullLogin = (pswd == attempt)
    if(successfullLogin) 
    {
        id = ID
        console.log(`Successfull Login! User ${id} is logged in.`)
    }
    else console.log("Incorrect Password")
})

setTimeout(() => console.log(fn), 100) //slight delay to pull name from database

driver.close()

module.exports.users_dbmanager = users_dbmanager