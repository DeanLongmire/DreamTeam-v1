const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

/*
  Initialize user. Added error checking for nonexistent user or
  incorrect password associated with user.
*/
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      // this checks for an invalid email account used at login
      return done(null, false, { message: 'Account does not exist' })
    }

    try {
      // making sure of correct password
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        // Checking for incorrect password with an existing account email
        return done(null, false, { message: 'Incorrect Password' })
      }
    } catch (e) {
      return done(e)
    }
  }

  // utilizing passport functions
  passport.use(new LocalStrategy({ usernameField: 'email' }, 
  authenticateUser))
  // Serialize user "saves" the user in the current session
  passport.serializeUser((user, done) => done(null, user.id))
  // retrieves the saved data about user in a session
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize