const express = require("express");
const passport = require("passport");
const passportConfig = require("../passportConfig")(passport);
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");

router.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Incorrect Email or Password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({
          message: "Successfully Authenticated",
          userId: req.user.id,
        });
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ userName: req.body.userName }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      try {
        const newUser = new User({
          name: req.body.name,
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

router.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: "User has been logged out" });
  });
});

module.exports = router;
