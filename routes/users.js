const express = require("express");
const router = express.Router();

const users = [
  {
    id: 1,
    userName: "beAnz",
  },
  {
    id: 2,
    userName: "paul",
  },
  {
    id: 3,
    userName: "eileen",
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id.toString() === req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

module.exports = router;
