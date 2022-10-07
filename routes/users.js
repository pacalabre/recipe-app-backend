const express = require("express");
const router = express.Router();
const { User } = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.post("/", async (req, res) => {
  //Add Validation
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    newSavedUser = await newUser.save();
    res.send(newSavedUser);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.put("/:id", async (req, res) => {
  // Add Validation
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

module.exports = router;
