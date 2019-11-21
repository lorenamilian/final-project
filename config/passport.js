const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

//telling passport what strategy to use and using emal/password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
      //when the user attemts to login run this code
      db.Users.findOne({ where: { email: email } }).then(function(dbUser) {
        if (!dbUser) {
          return done(null, false, { message: "Incorrect email" });
        } else if (!dbUser.verifyPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, dbUser);
      });
    }
  )
);

//stragery tp crete a user in our db if he doesnt already exist
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      console.log(req.body);
      //when the user attemts to login run this code
      db.Users.findOne({ where: { email: email } }).then(function(dbUser) {
        if (dbUser) {
          return done(null, false, { message: "Incorrect email" });
        } else {
          db.Users.create({
            name: req.body.name,
            state: req.body.state,
            city: req.body.city,
            email: email,
            password: password
          }).then(function(newUser) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  )
);
//encripting user to section
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//exporting config
module.exports = passport;
