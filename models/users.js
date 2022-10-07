const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    lowercase: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    lowercase: true,
    trim: true,
    unique: true,
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
  tagsUsed: Array,
  Avatar: String,
  savedRecipes: Array,
});

const User = new mongoose.model("User", userSchema);

function validateUser(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(50).required(),
    userName: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(7).max(100).required(),
    password: Joi.string().min(8).max(200).required(),
    dateCreated: Joi.date(),
    tagsUsed: Joi.array(),
  });
  return schema.validate(userRequest);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;
