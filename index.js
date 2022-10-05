const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")(app);
const mongoose = require("mongoose");

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
