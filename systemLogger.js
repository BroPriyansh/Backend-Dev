const os = require("os");
const fs = require("fs");

setInterval(() => {
  const info = `Time: ${new Date()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
-------------------------
`;
  fs.appendFile("system.log", info, () => {});
}, 5000);
