const lodash = require('lodash');

const name = ['tahsin', 'john']

const capitalize = lodash.map(name, lodash.capitalize);
console.log(capitalize);