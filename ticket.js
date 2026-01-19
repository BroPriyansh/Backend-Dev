const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/complain", (req, res) => {
    const { name, issue, priority } = req.query;

    if (!name || !issue || !priority) {
        return res.status(400).json({ error: "name, issue, and priority are required" });
    }

    const ticketId = "TKT-" + Math.floor(Math.random() * 1000000);

    const complaint =
        `Ticket: ${ticketId}\nName: ${name}\nIssue: ${issue}\nPriority: ${priority}\n-----------------------\n`;

    const fileName = priority.toLowerCase() === "high"
        ? "URGENT.txt"
        : "normal_complaints.txt";

    const filePath = path.join(__dirname, fileName);

    fs.appendFile(filePath, complaint, err => {
        if (err) {
            return res.status(500).json({ error: "Server error while saving complaint." });
        }

        return res.json({
            ticketId: ticketId,
            message: "We will solve your issue soon."
        });
    });
});

app.get("/", (req, res) => {
    res.send("Support Ticket API (GET Version) is running.");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
