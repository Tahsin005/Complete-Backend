console.log('Module wrapper explorer:');

console.log('__filename in explorer:', __filename);
console.log('__dirname in explorer:', __dirname);

module.exports.greet = function(name) {
    return `Hello, ${name}!`;
}