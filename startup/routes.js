const express = require("express");
const users = require("../routes/users");
const recipes = require("../routes/recipes");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/recipes", recipes);
};
