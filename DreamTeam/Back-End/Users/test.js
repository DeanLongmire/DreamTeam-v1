const sqlite3 = require('sqlite3').verbose()

function Users_dbmanager() {

    this.open = function () {
        this.db = new sqlite3.Database('../database.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err){
                return console.error(err.message)
            }
            console.log('Connected to SQLite database.db')
        })
    }

    this.create = function() {
        this.db.run('CREATE TABLE Users(ID INT, user_name TEXT, email TEXT, password TEXT, first_name TEXT, last_name TEXT, bio TEXT, pos TEXT, profile_picture BLOB)', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Created User table')
        })
    }

    this.drop = function() {
        this.db.run('DROP TABLE Users', (err)=>{
            if(err){return console.error(err.message)}
            console.log('Dropped User table')
        })
    }

    this.insert = function(ID, un, email, password, fn, ln, bio, pos, pp) {
        this.sql = 'INSERT INTO Users (ID, user_name, email, password, first_name, last_name, bio, pos, profile_picture) VALUES(?,?,?,?,?,?,?,?,?)'
        this.db.run(this.sql, [ID, un, email, password, fn, ln, bio, pos, pp], (err)=>{
            if(err){return console.log(err.message)}
            console.log('New row created in Users table')
        })
    }

    this.display_all = function() {
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

    this.get_fn = function(ID) {
        this.sql = 'SELECT first_name FROM Users WHERE ID = ?'
        this.db.get(this.sql,[ID],(err,row) => {
            if(err) {return console.error(err.message)}
            return row.first_name
                //? console.log(`${row.first_name}`)
                //: console.log("error")
        })
    }

    this.update_user_name = function(new_user_name, ID) {
        this.sql = "UPDATE Users SET user_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_user_name, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('User Name updated')
        })
    }

    this.update_first_name = function(new_fn, ID) {
        this.sql = "UPDATE Users SET first_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_fn, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('First Name updated')
        })
    }

    this.update_last_name = function(new_ln, ID) {
        this.sql = "UPDATE Users SET last_name = ? WHERE ID = ?"
        this.db.run(this.sql, [new_ln, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Last Name updated')
        })
    }

    this.update_email = function(new_email, ID) {
        this.sql = "UPDATE Users SET email = ? WHERE ID = ?"
        this.db.run(this.sql, [new_email, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Email updated')
        })
    }

    this.update_pos = function(new_pos, ID) {
        this.sql = "UPDATE Users SET pos = ? WHERE ID = ?"
        this.db.run(this.sql, [new_pos, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Position updated')
        })
    }

    this.update_bio = function(new_bio, ID) {
        this.sql = "UPDATE Users SET bio = ? WHERE ID = ?"
        this.db.run(this.sql, [new_bio, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Bio updated')
        })
    }

    this.update_password = function(new_password, ID) {
        this.sql = "UPDATE Users SET password = ? WHERE ID = ?"
        this.db.run(this.sql, [new_password, ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Password updated')
        })
    }

    this.delete_user = function(ID) {
        this.sql = 'DELETE FROM Users WHERE ID = ?'

        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message)}
            console.log('Deleted a user from the table')
        })
    }
    
    this.close = function() {
        this.db.close((err) => {
            if(err){
                return console.error(err.message)
            }
            console.log('Database Closed.')
        })
    }
}

let driver = new Users_dbmanager
let fn
driver.open()
driver.display_all()
fn = driver.get_fn(0)
console.log(fn)
driver.close()