const path = require('path');

console.log("Directory name:", path.dirname(__filename));
console.log("File name:", path.basename(__filename));
console.log("Extension name:", path.extname(__filename));

const joinPath = path.join(__dirname, 'first-module.js');
console.log("Join path:", joinPath);

const resolvePath = path.resolve(__dirname, 'first-module.js');
console.log("Resolve path:", resolvePath);

const normalizePath = path.normalize('/user/documents/../node/projects/index.js');

console.log("Normalize path:", normalizePath);