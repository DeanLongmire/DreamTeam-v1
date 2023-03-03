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
                })
                rl.close();
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

ask_credentials()