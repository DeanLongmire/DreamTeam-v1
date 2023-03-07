const global_users = require("./global_users")
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let driver = new global_users.users_dbmanager

function ask_credentials() {
    rl.question('Please Enter a User Name and Password\n', (answer) => {
        const[user_name,password] = answer.split(' ')
        if(answer.split(' ').length != 2)
        {
            console.log("Please enter a password too.")
            ask_credentials()
            return
        }
        driver.open()
        driver.get_ID(user_name,(returned_password,returned_ID) => {
            if(returned_password == password)
            {
                driver.get_fn(returned_ID,(first_name) => {
                    console.log('\x1b[32;1m%s\x1b[0m', `Welcome ${first_name}!`)
                    choose_processes()
                })
            }
            else 
            {
                if(returned_ID instanceof Error) 
                    console.log('User not found');
                else
                    console.log('\x1b[31m%s\x1b[0m', 'Incorrect Password');
                ask_credentials();
            }
        })
    })
}

function choose_processes() {
    rl.question("What would you like to do?\n0 Read all\n1 Add to database\n2 Delete from database\n3 Get data\n4 Change data\n5 Exit\n",(answer) => {
        switch(answer) {
            case '0': 
                driver.display_all(choose_processes)
                break;
            case '1': 
                console.log("Adding to the database")
                add_to_db(choose_processes)
                break;
            case '2':
                console.log("Deleting from the database") 
                delete_from_db(choose_processes)
                break;
            case '3': 
                console.log("Getting data")
                get_data(choose_processes)
                break;
            case '4': 
                console.log("Changing a users data")
                break;
            case '5':
                driver.close()
                process.exit(1)
        }
    })
}

function add_to_db(callback) {
    rl.question("Please enter a user name, password, email, first name, last name, position, and a #bio#\n",(answer) => {
        const[un,psswd,email,fn,ln,pos] = answer.split(' ')
        const[junk,bio] = answer.split('#')
        driver.insert(un,email,psswd,fn,ln,bio,pos,null)
        console.log(`User, ${fn}, added to database\n`)
        callback()
    })
}

function delete_from_db(callback) {
    rl.question("Enter the ID of the user to delete\n",(answer) => {
        let fn
        driver.get_fn(answer,(firstname) => {
            fn = firstname
            driver.delete_user(answer)
            console.log(`User ${fn} has been deleted\n`)
            callback()
        })
    })
}

function get_data(callback) {
    rl.question("What User's data would you like to get (ID)?\n",(answer) => {
        let ID = answer
        rl.question("What would you like to read?\n0 Username\n1 First Name\n2 Last Name\n3 Password\n4 Email\n5 Position\n6 Bio\n",(answer) => {
            switch(answer) {
                case '0': 
                    driver.get_user_name(ID, (us) => {
                        console.log(`User ${ID}'s username is ${us}\n`)
                        callback()
                    })
                    break;
                case '1': 
                    driver.get_fn(ID, (firstname) => {
                        console.log(`User ${ID}'s first name is ${firstname}\n`)
                        callback()
                    })
                    break;
                case '2':
                    driver.get_ln(ID, (lastname) => {
                        console.log(`User ${ID}'s last name is ${lastname}\n`)
                        callback()
                    })
                    break;
                case '3': 
                    driver.get_password(ID, (password) => {
                        console.log(`User ${ID}'s password is ${password}\n`)
                        callback()
                    })
                    break;
                case '4': 
                    driver.get_email(ID, (email) => {
                        console.log(`User ${ID}'s email is ${email}\n`)
                        callback()
                    })
                    break;
                case '5':
                    driver.get_position(ID, (pos) => {
                        console.log(`User ${ID}'s position is ${pos}\n`)
                        callback()
                    })
                    break;
                case '6':
                    driver.get_bio(ID, (bio) => {
                        console.log(`User ${ID}'s bio is "${bio}"\n`)
                        callback()
                    })
                    break;
            }
        })
    })
}

ask_credentials()