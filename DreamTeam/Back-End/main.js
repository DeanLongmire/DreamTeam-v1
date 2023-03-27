const sqlite3 = require('sqlite3').verbose();
const global_leagues = require('./Leagues/global_leagues'); //Custom import
const global_teams = require('./Teams/global_teams');
const global_users = require('./Users/global_users');

const express = require('express')
const app = express()
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

const path = require('path')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
var http = require('http')
var fs = require('fs')
const port = 3000


// Utilizing passport-config.js file
const initializePassport = require('./Users/passport-config')
initializePassport(
  passport,
  email => userList.find(userList => userList.email === email),
  id => userList.find(user => user.id === id)
)

const userList = []
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// app.get('/DreamTeam', function (req, res) {
//     res.render('index', {});
// });

app.use(express.static(path.join(__dirname, '../Front-End')));

app.get('/', confirmAuthenticated, (req, res) =>{
    res.render('index', {name: req.user.name})
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) =>{
    res.render('login')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/', // on success, redirect to home page
    failureRedirect: '/login', // redirects to login page on failure
    failureFlash: true
  }))
  
  app.get('/registry', checkNotAuthenticated, (req, res) =>{
    res.render('registry')
  })
  
  /*
    Allows a user to register an account by
    providing a username, email, and pwd that
    is hashed by bcrypt library
  */
  app.post('/registry', checkNotAuthenticated, async (req, res) =>{
    try{
      const hashedpwd = await bcrypt.hash(req.body.password, 10)
      userList.push({
        // populating user list with a user's credentials
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedpwd
      })
      res.redirect('/login') // once registered, return to login page
    } catch {
      res.redirect('/registry')
    }
  })
  
  /* 
    Handles logging a user out and
    redirecting them to the login page.
  */
  app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });


// Confirms a user is authenticated,
// else redirects them to the login page
function confirmAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
  
  // Check if user is not authenticated
  // if not, redirects them to home page with message displayed
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}


app.listen(port, () => console.log(`API listening on port ${port}`));
//app.listen(3000);

let league_db = new global_leagues.league_dbmanager;
let team_db = new global_teams.team_dbmanager;
let users_db = new global_users.users_dbmanager;

console.log("Test")
