const fs = require('fs');
const path = require('path');

function readDirectoryMap(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    const directoryMap = entries.reduce((map, entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        map[entry.name] = readDirectoryMap(fullPath);
      } else {
        map[entry.name] = fullPath;
      }

      return map;
    }, {});

    return directoryMap;
  } catch (error) {
    console.error('Oops! Something went wrong:', error.message);
    return {};
  }
}

// Replace '/your/target/path' with the actual path you're interested in
const targetPath = 'C:/Users/Admin/Desktop/files';
const directoryMap = readDirectoryMap(targetPath);

console.log('Directory Map:', directoryMap);
