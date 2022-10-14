const express = require("express");
const router = express.Router();
const { Recipe, validateRecipe } = require("../models/recipes");

router.get("/", async (req, res) => {
  try {
    const recipe = await Recipe.find();
    res.send(recipe);
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
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: req.body.image,
      author: req.body.author,
      favorites: req.body.favorites,
      dateCreated: req.body.dateCreated,
      updatedOnDate: req.body.updatedOnDate,
      tags: req.body.tags,
      link: req.body.link,
      easeOfMaking: req.body.easeOfMaking,
      totalMakeTime: req.body.totalMakeTime,
      ingredients: req.body.ingredients,
      description: req.body.description,
      steps: req.body.steps,
    });
    newSavedRecipe = await newRecipe.save();
    res.send(newSavedRecipe);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateRecipe(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: req.body.image,
      author: req.body.author,
      favorites: req.body.favorites,
      dateCreated: req.body.dateCreated,
      updatedOnDate: req.body.updatedOnDate,
      tags: req.body.tags,
      link: req.body.link,
      easeOfMaking: req.body.easeOfMaking,
      totalMakeTime: req.body.totalMakeTime,
      ingredients: req.body.ingredients,
      description: req.body.description,
      steps: req.body.steps,
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
