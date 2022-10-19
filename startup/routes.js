const express = require("express");
const users = require("../routes/users");
const recipes = require("../routes/recipes");
const tags = require("../routes/tags");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/recipes", recipes);
  app.use("/api/tags", tags);
};
