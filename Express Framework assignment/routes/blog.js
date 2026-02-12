const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "First Post", content: "Hello world" },
  { id: 2, title: "Second Post", content: "Learning Express" }
];

router.get("/", (req, res) => {
  res.render("blog-list", { posts });
});

router.get("/new/form", (req, res) => {
  res.render("blog-new");
});

router.post("/new", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect("/blog");
});

router.get("/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("blog-post", { post });
});

module.exports = router;