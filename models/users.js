const mongoose = require("mongoose");
const Joi = require("joi");
const { tagSchema } = require("../models/tags");

const savedRecipeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 80,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 100,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 200,
    trim: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tagsUsed: [],
  avatar: String,
  savedRecipes: [],
  isAdmin: Boolean,
});

const User = new mongoose.model("User", userSchema);

function validateNewUser(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(1).max(80).required(),
    email: Joi.string().min(7).max(100).required(),
    password: Joi.string()
      .min(8)
      .max(200)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    dateCreated: Joi.date(),
    tagsUsed: Joi.array(),
    isAdmin: Joy.Boolean(),
  });
  return schema.validate(userRequest);
}

function validateUpdateUser(userRequest) {
  const schema = Joi.object({
    savedRecipes: Joi.array(),
    tagsUsed: Joi.array(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(userRequest);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateNewUser = validateNewUser;
exports.validateUpdateUser = validateUpdateUser;
