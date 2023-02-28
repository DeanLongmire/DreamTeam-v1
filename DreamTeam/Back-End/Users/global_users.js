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
                console.log(`${row.ID} ${row.first_name} ${row.last_name} - ${row.email} - ${row.user_name} : ${row.password} - ${row.bio} - ${row.pos}`);
            });
            console.log("");
            console.log('End of Users Table')
        });
    };

    update_user_name(new_user_name, ID){
        this.sql = "UPDATE Users SET user_name = ? WHERE ID = ?";
        this.db.run(this.sql, [new_user_name, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('User Name updated');
        });
    };

    update_first_name(new_fn, ID){
        this.sql = "UPDATE Users SET first_name = ? WHERE ID = ?";
        this.db.run(this.sql, [new_fn, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('First Name updated');
        });
    };

    update_last_name(new_ln, ID){
        this.sql = "UPDATE Users SET last_name = ? WHERE ID = ?";
        this.db.run(this.sql, [new_ln, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Last Name updated');
        });
    };

    update_email(new_email, ID){
        this.sql = "UPDATE Users SET email = ? WHERE ID = ?";
        this.db.run(this.sql, [new_email, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Email updated');
        });
    };

    update_pos(new_pos, ID){
        this.sql = "UPDATE Users SET pos = ? WHERE ID = ?";
        this.db.run(this.sql, [new_pos, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Position updated');
        });
    };

    update_bio(new_bio, ID){
        this.sql = "UPDATE Users SET bio = ? WHERE ID = ?";
        this.db.run(this.sql, [new_bio, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Bio updated');
        });
    };

    update_password(new_password, ID){
        this.sql = "UPDATE Users SET password = ? WHERE ID = ?";
        this.db.run(this.sql, [new_password, ID], (err)=>{
            if(err){return console.log(err.message);}
            console.log('Password updated');
        });
    };

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
//driver.insert(2,"na","na","na","na","na", "na", "na",null);
//driver.drop();
driver.display_all();
//driver.update_first_name("Colbe",2);
//driver.update_last_name("Brian",2);
//driver.update_user_name("CB",2);
//driver.update_email("CB3@gmail.com",2);
//driver.update_password("12345",2);
//driver.update_bio("Wet",2);
//driver.update_pos("PG",2);
//driver.update_user_name("Deanathan",0);
//driver.delete_user(0);
driver.close();

module.exports.users_dbmanager = users_dbmanager;