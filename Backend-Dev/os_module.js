const fs = require("fs");
const os = require("os");

setInterval(() => {
  const logData = `
Time: ${new Date().toLocaleString()}
OS: ${os.platform()}
CPU: ${os.cpus()[0].model}
Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
Uptime: ${(os.uptime() / 60).toFixed(2)} minutes
--------------------------------------
`;

  fs.appendFileSync("system.log", logData);
  console.log("Log written...");
}, 5000);

console.log("System monitoring started...");