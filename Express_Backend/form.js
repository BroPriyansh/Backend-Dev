const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    const success = req.query.success;
    res.send(`
        <h2>User Form</h2>
        ${success ? "<p style='color:green;'>Data saved successfully!</p>" : ""}
        <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="branch">Branch:</label>
            <select id="branch" name="branch" required>
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
            </select><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});


app.post("/submit", (req, res) => {
    const newData = req.body;

    let data = [];
    if (fs.existsSync("data.json")) {
        const file = fs.readFileSync("data.json");
        data = JSON.parse(file);
    }

    data.push(newData);

    fs.writeFileSync("Express_Backend/data.json", JSON.stringify(data, null, 2));

    res.redirect("/?success=true");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
