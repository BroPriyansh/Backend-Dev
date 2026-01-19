const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) return;
  const wordCount = data.trim().split(/\s+/).length;
  fs.writeFile("output.txt", `Word Count: ${wordCount}`, () => {});
});
