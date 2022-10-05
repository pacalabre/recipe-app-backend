const mongoose = require("mongoose");

module.exports = function (app) {
  mongoose
    .connect("mongodb://localhost/caladine")
    .then(() => console.log("connected to mongo!"))
    .catch((err) => console.log(`could not connect to mongo: ${err}`));
};
