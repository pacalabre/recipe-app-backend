const express = require("express");
const router = express.Router();
const { Tag, validateTag } = require("../models/tags");

router.get("/", async (req, res) => {
  try {
    const tag = await Tag.find();
    res.send(tag);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      res.status(404).send("Tag not found");
    }
    res.send(tag);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateTag(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const newTag = new Tag({
      tagName: req.body.tagName,
    });
    newSavedTag = await newTag.save();
    res.send(newSavedTag);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateTag(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, {
      tagName: req.body.tagName,
    });
    if (!tag) {
      res.status(404).send("Tag not found");
    }
    res.send(tag);
  } catch (error) {
    res.send(`There was an error: ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByIdAndRemove(req.params.id);
    if (!tag) {
      res.status(404).send("Tag not found");
    }
    res.send(tag);
  } catch (error) {
    res.send(`There was an error ${error}`);
  }
});

module.exports = router;
