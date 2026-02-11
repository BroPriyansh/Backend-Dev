const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    const success = req.query.success;
    res.render("form", { success });
});

app.post("/submit", (req, res) => {
    const newData = req.body;

    let data = [];
    if (fs.existsSync("data.json")) {
        data = JSON.parse(fs.readFileSync("data.json"));
    }

    data.push(newData);

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.redirect("/?success=true");  
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
