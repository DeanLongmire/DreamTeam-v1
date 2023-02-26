//This is the V1 test file for creating, updating, and deleting Leagues from
//the SQLite3 ../database.db 
//Integration with other systems will be handled once prelimenary proof-of-concept
//functionality is implemented 

//Requires
const sqlite3 = require('sqlite3').verbose();

//connect to database.db
let db = new sqlite3.Database('../database.db', (err) => {
    if (err){
        return console.error(err.message);
    }
    console.log('Connected to SQLite Database')
});

//create league table in database

//insert league

//update league

//delete league

//close database.db
db.close((err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Database Closed.');
});