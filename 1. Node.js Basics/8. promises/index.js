const LOG = require('logified');

LOG("Starting Promise Example...");


function delayFn(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


LOG.startTimer('timer...');
delayFn(2000).then(() => LOG('Delay of 2 seconds completed!'));
LOG.endTimer('timer...');


function divideFn(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Division by zero is not allowed');
        } else {
            resolve(a / b);
        }
    });
};

divideFn(10, 2)
    .then(result => LOG(`Result: ${result}`))
    .catch(error => LOG(`Error: ${error}`));
    
divideFn(10, 0)
    .then(result => LOG(`Result: ${result}`))
    .catch(error => LOG(`Error: ${error}`));