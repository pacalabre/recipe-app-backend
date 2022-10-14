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
    minlength: 1,
    maxlength: 85,
  },
  favorites: [String],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOnDate: Date,
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

function validateRecipe(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().min(1).max(50).required(),
    subtitle: Joi.string().min(1).max(280).required(),
    image: Joi.string(),
    author: Joi.string().min(1).max(85).required(),
    favorites: Joi.array(),
    dateCreated: Joi.date(),
    updatedOnDate: Joi.date(),
    tags: Joi.array(),
    link: Joi.string(),
    easeOfMaking: Joi.number().min(1).max(5),
    totalMakeTime: Joi.string(),
    ingredients: Joi.array().required(),
    description: Joi.string().min(1).max(5000),
    steps: Joi.array().required(),
  });
  return schema.validate(userRequest);
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.recipeSchema = recipeSchema;
