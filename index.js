require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
app.set("trust proxy", 1);
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
