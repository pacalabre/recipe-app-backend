const mongoose = require("mongoose");
const Joi = require("joi");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    lowercase: true,
    trim: true,
  },
  subtitle: {
    type: String,
    minlength: 1,
    maxlength: 280,
    lowercase: true,
    trim: true,
  },
  image: String,
  author: {
    type: String,
    required: true,
  },
  favorites: [String],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedDate: Date,
  tags: [String],
  link: String,
  easeOfMaking: {
    type: Number,
    minimum: 0,
    maximum: 5,
  },
  totalMakeTime: String,
  ingredients: [String],
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
    trim: true,
  },
  steps: {
    type: [String],
    required: true,
  },
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

exports.Recipe = Recipe;
exports.recipeSchema = recipeSchema;
