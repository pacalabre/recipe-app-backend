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

router.post("/", (req, res) => {
  const user = users.find((user) => user.id === req.body.id);

  if (user) {
    res.send("user is already registered");
    return;
  }
  const newUser = {
    id: req.body.id,
    userName: req.body.userName,
  };
  users.push(newUser);
  res.send(users);
});

router.put("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.body.id);
  if (!user) {
    res.send("user not found");
    return;
  }
  user.userName = req.body.userName;
  res.send(users);
});

router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id.toString() === req.params.id);
  if (!user) {
    res.send("user not found");
    return;
  }
  const indexOfUser = users.indexOf(user);
  users.splice(indexOfUser, 1);
  res.send(users);
});

module.exports = router;
