const mongoose = require("mongoose");
const Joi = require("joi");

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    minlength: 1,
    maxlength: 50,
    lowercase: true,
    trim: true,
    unique: true,
  },
});

const Tag = new mongoose.model("Tag", tagSchema);

function validateTag(userRequest) {
  const schema = Joi.object({
    id: Joi.string(),
    tagName: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(userRequest);
}

exports.Tag = Tag;
exports.tagSchema = tagSchema;
exports.validateTag = validateTag;
