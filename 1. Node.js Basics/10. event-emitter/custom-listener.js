const EventEmitter = require('events');

class MyCustomEmitter extends EventEmitter {
    constructor() {
        super();
        this.greeting = 'Helllo'
    }

    // Custom method to emit an event
    greet(name) {
        console.log(`Greeting event emitted with name: ${name}`);
        this.emit('greeting', `${this.greeting}, ${name}!`);
        console.log(`Greeting event have been triggered successfully: ${name}`);
    }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on('greeting', (input) => {
    console.log('Greeting event triggered:', input);
});

myCustomEmitter.greet('Tahsin');