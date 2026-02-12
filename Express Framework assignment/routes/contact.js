const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully!");
});

module.exports = router;