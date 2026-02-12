const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./middleware/responseTime"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/users", require("./routes/users"));
app.use("/contact", require("./routes/contact"));
app.use("/blog", require("./routes/blog"));

app.get("/gallery", (req, res) => {
  const images = [
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1016/400/300",
    "https://picsum.photos/id/1018/400/300"
  ];

  res.render("gallery", { images });
});


app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));