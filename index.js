const express = require("express");
const app = express();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("./models/users");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("./startup/routes")(app);
require("./startup/db")(app);
const passportConfig = require("./passportConfig")(passport);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "placeholder",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("placeholder"));
app.use(passport.initialize());
app.use(passport.session());

/* Authentication */

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ userName: req.body.userName }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      try {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: hashedPassword,
        });
        newSavedUser = await newUser.save();
        res.send(newSavedUser);
      } catch (error) {
        res.send(`There was an error: ${error}`);
      }
    }
  });
});

app.post("/logout", function (req, res) {
  req.logout();
});
