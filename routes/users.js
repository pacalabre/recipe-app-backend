const express = require("express");
const router = express.Router();
const {
  User,
  validateNewUser,
  validateUpdateUser,
} = require("../models/users");
const { Tag } = require("../models/tags");
const { Recipe } = require("../models/recipes");

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
    res.send({
      id: user._id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      dateCreated: user.dateCreated,
      tagsUsed: user.tagsUsed,
      savedRecipes: user.savedRecipes,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.get("/:id/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({ ["author._id"]: req.params.id });
    if (!recipes) {
      res.status(404).send("User's Recipes not found");
    }
    res.send(recipes);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.get("/:id/favoriteRecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({ ["favorites"]: req.params.id });
    if (!recipes) {
      res.status(404).send("User's favorite recipes not found");
    }
    res.send(recipes);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateNewUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    newSavedUser = await newUser.save();
    res.send(newSavedUser);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let tags = [];

  try {
    tags = await Tag.find({ _id: { $in: req.body.tagsUsed } });
  } catch (error) {
    return res.status(400).send(`Invalid Tags ${error}`);
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      savedRecipes: req.body.savedRecipes,
      tagsUsed: tags,
      isAdmin: req.body.isAdmin,
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
