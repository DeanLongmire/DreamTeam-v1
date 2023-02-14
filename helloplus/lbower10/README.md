# My Hello Plus
Logan Bowers - COSC 340

# Login System
For my helloplus assignment, I followed along with a tutorial from

Web Dev Simplified on youtube: [Node.js Passport Login System](https://www.youtube.com/watch?v=-RCnNyD0L-s).

In this tutorial, I created a login system that allows a user to register an account, login with that account, and then log out. The account is not yet saved to an actual database, rather it is stored locally in memory just for simplicity.

I gained practice with writing code to create a webpage, redirect users to different pages, and overall practice with the structure of node.js and html. On top of this, I learned how to use nodemon to host my node.js server.

As the group project progresses, some experience with CSS could allow me to style my websites how I want them as well.

# How to Run: 
* In VSCode terminal, type the command "npm run devStart" to host the server. The website URL is [localhost:3000/login](http://localhost:3000/login). Must have node.js installed to run.
* Since this demo is not connected to an actual database, user emails and passwords are stored locally. To use all features of this
application, first navigate to the "sign up" page. Enter a username of your choice, an email (must have an '@' character), and a password. Once this is done, you will be redirected to the login page. Use the email and password you have just entered, and then you will be redirected to a page that displays a greeting message with your username. Press sign out to be redirected to the home page.
* While the server is running, your credentials will be stored locally and you will be able to log in as many times as you please. Once the server is shut down using ctrl+c, your credentials will not be remembered upon the next "npm run devStart" command.

# Current error checking
* Server knows whether an email or password is incorrect or an account doesn't exist, and displays a message accordingly.