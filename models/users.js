const mongoose = require("mongoose");

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
  tags: Array,
  Avatar: String,
  savedRecipes: Array,
});

const User = new mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
