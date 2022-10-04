const express = require("express");
const app = express();
require("./startup/routes")(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
