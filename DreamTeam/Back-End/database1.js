//Requires
const sqlite3 = require('sqlite3').verbose();

//connect to database.db
let db = new sqlite3.Database('database.db', (err) => {
    if (err){
        return console.error(err.message);
    }
    console.log('Connected to SQLite Database')
});

//close database.db
db.close((err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Database Closed.');
});