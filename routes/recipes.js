const express = require("express");
const router = express.Router();
const { Recipe, validateRecipe } = require("../models/recipes");
const { Tag } = require("../models/tags");
const { User } = require("../models/users");
const { ensureAuth } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateRecipe(req.body);
  const author = await User.findById(req.body.author);
  let tags = [];

  try {
    tags = await Tag.find({ _id: { $in: req.body.tags } });
  } catch (error) {
    return res.status(400).send(`Invalid Tags ${error}`);
  }

  if (error || !author) {
    if (error) return res.status(400).send(error.details[0].message);
    if (!author) return res.status(400).send("Invalid Author");
  }
  try {
    const newRecipe = new Recipe({
      recipeName: req.body.recipeName,
      image: req.body.image,
      author: {
        _id: author._id,
        name: author.name,
      },
      favorites: req.body.favorites,
      dateCreated: req.body.dateCreated,
      updatedOnDate: req.body.updatedOnDate,
      tags: tags,
      link: req.body.link,
      recipeDifficulty: req.body.recipeDifficulty,
      totalMakeTime: req.body.totalMakeTime,
      ingredients: req.body.ingredients,
      description: req.body.description,
      recipeInstructions: req.body.recipeInstructions,
    });
    newSavedRecipe = await newRecipe.save();
    res.send(newSavedRecipe);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
  // If tags are used, save them to the author
  // Add recipe to the authors
});

router.put("/:id", async (req, res) => {
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      recipeName: req.body.recipeName,
      image: req.body.image,
      favorites: req.body.favorites,
      dateCreated: req.body.dateCreated,
      updatedOnDate: req.body.updatedOnDate,
      tags: req.body.tags,
      link: req.body.link,
      recipeDifficulty: req.body.recipeDifficulty,
      totalMakeTime: req.body.totalMakeTime,
      ingredients: req.body.ingredients,
      description: req.body.description,
      recipeInstructions: req.body.recipeInstructions,
    });
    if (!recipe) {
      res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndRemove(req.params.id);
    if (!recipe) {
      res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

module.exports = router;
