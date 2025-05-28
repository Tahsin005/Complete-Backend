const fs = require('fs');
const path = require('path');

// synchronous way of file operations

const dataFolder = path.join(__dirname, 'data');

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log('Data folder created successfully.');
}

const filePath = path.join(dataFolder, 'example.txt');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Hello, world!');
    console.log('File created successfully.');
}

fs.writeFileSync(filePath, 'Hello, world!');
console.log('File updated successfully.');

const fileContent = fs.readFileSync(filePath, 'utf-8');
console.log('File content:', fileContent);

fs.appendFileSync(filePath, '\nThis is a new line added to the file.');
console.log('File appended successfully.');


// asynchronous way of file operations

const asyncFilePath = path.join(dataFolder, 'async-example.txt');

fs.writeFile(asyncFilePath, 'Hello, async node.js', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Async file created successfully.');

    fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Async file content:', data);

        fs.appendFile(asyncFilePath, '\nThis is a new line added to the file.', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Async file appended successfully.');
        });

        fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Updated async file content:', data);
        });
    });
})