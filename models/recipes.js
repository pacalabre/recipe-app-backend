const mongoose = require("mongoose");
const Joi = require("joi");
const { tagSchema } = require("../models/tags");

const favoritesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

const recipeSchema = new mongoose.Schema({
  recipeName: {
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
    type: new mongoose.Schema({
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
  favorites: [favoritesSchema],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOnDate: Date,
  tags: [tagSchema],
  link: String,
  recipeDifficulty: {
    type: Number,
    minimum: 0,
    maximum: 5,
    required: true,
  },
  totalMakeTime: String,
  ingredients: String,
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000,
    trim: true,
  },
  recipeInstructions: {
    type: String,
    required: true,
  },
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

function validateRecipe(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    recipeName: Joi.string().min(1).max(50).required(),
    subtitle: Joi.string().min(1).max(280).required(),
    image: Joi.string(),
    author: Joi.object().required(),
    favorites: Joi.array(),
    dateCreated: Joi.date(),
    updatedOnDate: Joi.date(),
    tags: Joi.array(),
    link: Joi.string(),
    recipeDifficulty: Joi.number().min(1).max(5),
    totalMakeTime: Joi.string(),
    //ingredents should be required
    ingredients: Joi.string(),
    description: Joi.string().min(1).max(5000),
    //recipeInstructions will be required, but not for initial form buildout
    recipeInstructions: Joi.string(),
  });
  return schema.validate(userRequest);
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.recipeSchema = recipeSchema;
