
const fs = require('fs/promises');
const path = require('path');

async function syncDirs(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const files = await fs.readdir(src);

  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    const stat = await fs.stat(srcPath);
    if (stat.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
  console.log('Directories synchronized');
}

// Example usage:
// syncDirs('dir1', 'dir2');
