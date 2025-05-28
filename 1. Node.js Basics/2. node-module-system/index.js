const firstModule = require('./first-module');

console.log(firstModule.add(5, 3));        // Output: 8
console.log(firstModule.subtract(5, 3));   // Output: 2
console.log(firstModule.multiply(5, 3));   // Output: 15
console.log(firstModule.divide(5, 3));     // Output: 1.6666666666666667

try {
    console.log(firstModule.divide(5, 0));     // Throws Error: Cannot divide by zero
} catch (error) {
    console.error(error.message);  // Output: Cannot divide by zero
}