
const fs = require('fs/promises');
const path = require('path');

async function list(dir) {
  const files = await fs.readdir(dir);
  console.log(files);
}

async function read(file) {
  const data = await fs.readFile(file, 'utf8');
  console.log(data);
}

async function write(file, content) {
  await fs.writeFile(file, content, 'utf8');
  console.log('File written');
}

async function copy(src, dest) {
  await fs.copyFile(src, dest);
  console.log('File copied');
}

async function remove(file) {
  await fs.unlink(file);
  console.log('File deleted');
}

// Example usage:
// node fileManager.js
