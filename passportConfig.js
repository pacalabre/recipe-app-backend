const { User } = require("./models/users");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else {
    console.log("USER IS NOT AUTHENTICATED");
  }
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  else {
    console.log("USER IS NOT AUTHENTICATED");
  }
}
