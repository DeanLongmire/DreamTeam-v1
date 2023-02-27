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
        this.db.run('CREATE TABLE Users(ID INT, user_name TEXT, email TEXT, password TEXT, first_name TEXT, last_name TEXT, bio TEXT, pos TEXT, profile_picture BLOB)', (err)=>{
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

    insert(ID, un, email, password, fn, ln, bio, pos, pp){
        this.sql = 'INSERT INTO Users (ID, user_name, email, password, first_name, last_name, bio, pos, profile_picture) VALUES(?,?,?,?,?,?,?,?,?)';
        this.db.run(this.sql, [ID, un, email, password, fn, ln, bio, pos, pp], (err)=>{
            if(err){return console.log(err.message);}
            console.log('New row created in Users table')
        });
    };

    display_all(){
        this.sql = 'SELECT * FROM Users';

        this.db.all(this.sql, [], (err,rows)=>{
            if(err){return console.error(err.message);}
            console.log("");
            rows.forEach((row)=>{
                console.log(`${row.ID} ${row.first_name} ${row.last_name} - ${row.email}`);
            });
            console.log("");
            console.log('End of Users Table')
        });
    };

    update_name(){};

    delete_user(ID){
        this.sql = 'DELETE FROM Users WHERE ID = ?';

        this.db.run(this.sql, [ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Deleted a user from the table')
        });
    };
    
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
//driver.create();
//driver.insert(1,"Ye2020","KanyeWeezy@yahoo.com","gayfish","Kanye","West", "WTF does that mean Kobe Bryant", "All Around Dawg",null);
//driver.drop();
driver.display_all();
//driver.delete_user(0);
driver.close();

module.exports.users_dbmanager = users_dbmanager;