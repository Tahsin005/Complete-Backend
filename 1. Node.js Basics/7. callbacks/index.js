const fs = require('fs');

function person(name, callbackFn) {
    console.log(`Hello, ${name}!`);
    callbackFn('123 Main St, Springfield, USA');
}

function address(address) {
    console.log(address);
}

person('Tahsin', address);


fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
})