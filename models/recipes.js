const mongoose = require("mongoose");
const Joi = require("joi");
const { tagSchema } = require("../models/tags");

const favoritesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    type: new mongoose.Schema({
      _id: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
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

function validateRecipe(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().min(1).max(50).required(),
    subtitle: Joi.string().min(1).max(280).required(),
    image: Joi.string(),
    author: Joi.object().required(),
    favorites: Joi.array(),
    dateCreated: Joi.date(),
    updatedOnDate: Joi.date(),
    tags: Joi.array(),
    link: Joi.string(),
    easeOfMaking: Joi.number().min(1).max(5),
    totalMakeTime: Joi.string(),
    //ingredents should be required
    ingredients: Joi.array(),
    description: Joi.string().min(1).max(5000),
    //steps will be required, but not for initial form buildout
    steps: Joi.array(),
  });
  return schema.validate(userRequest);
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.recipeSchema = recipeSchema;
