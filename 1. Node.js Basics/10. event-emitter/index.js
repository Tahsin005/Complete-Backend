const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();

// Register a listener for an event
myFirstEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit the event
myFirstEmitter.emit('greet', 'Tahsin');