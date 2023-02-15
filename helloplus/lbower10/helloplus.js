if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Libraries used
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

// Utilizing passport-config.js file
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => userList.find(userList => userList.email === email),
  id => userList.find(user => user.id === id)
)

const userList = [] // locally storing users

// setting and using library functions
app.set('view-engine', 'ejs')
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

app.get('/', confirmAuthenticated, (req, res) =>{
  res.render('index.ejs', {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) =>{
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/', // on success, display home page with greeting message
  failureRedirect: '/login', // redirects to login page on failure
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) =>{
  res.render('register.ejs')
})

/*
  Allows a user to register an account by
  providing a username, email, and pwd that
  is hashed by bcrypt library
*/
app.post('/register', checkNotAuthenticated, async (req, res) =>{
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
    res.redirect('/register')
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

app.listen(3000) // running on port 3000