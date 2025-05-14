const express = require("express");
const passport = require("passport");
const passportConfig = require("../passportConfig")(passport);
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const Joi = require("joi");

router.get("/user", (req, res) => {
  if (!req.user) res.status(404).send("There is no user currently logged in.");
  const userToSend = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  };
  res.send(userToSend);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(401).send("Incorrect Email or Password");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send({
          message: "Successfully Authenticated",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: req.user.isAdmin,
          },
        });
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { error } = validateNewUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists", doc);

    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      try {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          isAdmin: req.body.isAdmin,
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

function validateNewUser(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(1).max(80).required(),
    email: Joi.string()
      .min(7)
      .max(100)
      .required()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: Joi.string()
      .min(8)
      .max(200)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    dateCreated: Joi.date(),
    tagsUsed: Joi.array(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(userRequest);
}

module.exports = router;
