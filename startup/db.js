const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

module.exports = function (app) {
  mongoose
    .connect(`${process.env.MONGO_URI}/caladine`)
    //.connect("mongodb://localhost/caladine")
    .then(() => console.log("connected to mongo!"))
    .catch((err) => {
      console.log(`could not connect to mongo: ${err}`);
    });
};
