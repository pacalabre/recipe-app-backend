const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const users = require("../routes/users");
const recipes = require("../routes/recipes");
const tags = require("../routes/tags");
const auth = require("../routes/auth");
const { default: mongoose } = require("mongoose");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "placeholder",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost/caladine",
        ttl: 604800,
      }),
      //cookie: { secure: true },
    })
  );
  app.use(cookieParser("placeholder"));
  app.use(passport.initialize());
  app.use(passport.session());
  require("../passportConfig")(passport);

  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/recipes", recipes);
  app.use("/api/tags", tags);
};
