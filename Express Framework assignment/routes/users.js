const express = require("express");
const router = express.Router();

const users = [
  { name: "Priyansh" },
  { name: "Aman" },
  { name: "Riya" },
  { name: "Priya" }
];

router.get("/", (req, res) => {
  const { name } = req.query;

  const filtered = name
    ? users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
    : users;

  res.render("users", { users: filtered });
});

module.exports = router;