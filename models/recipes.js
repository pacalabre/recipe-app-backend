const mongoose = require("mongoose");
const Joi = require("joi");
const { tagSchema } = require("../models/tags");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    maxlength: 150,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
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
    }),
    required: true,
  },
  favorites: [String],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOnDate: Date,
  tags: [
    {
      type: new mongoose.Schema({
        _id: {
          type: String,
        },
        tagName: {
          type: String,
        },
      }),
    },
  ],
  recipeDifficulty: {
    type: Number,
    minimum: 1,
    maximum: 5,
    required: true,
  },
  totalMakeTime: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
  ingredients: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  description: {
    type: String,
    maxlength: 250,
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
    recipeName: Joi.string().max(150).required(),
    image: Joi.string().required(),
    author: Joi.object().required(),
    favorites: Joi.array(),
    dateCreated: Joi.date(),
    updatedOnDate: Joi.date(),
    tags: Joi.array(),
    link: Joi.string(),
    recipeDifficulty: Joi.number().min(1).max(5).required(),
    totalMakeTime: Joi.string().max(500).required(),
    ingredients: Joi.string().max(1000).required(),
    description: Joi.string().max(250),
    recipeInstructions: Joi.string().required(),
  });
  return schema.validate(userRequest);
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.recipeSchema = recipeSchema;
