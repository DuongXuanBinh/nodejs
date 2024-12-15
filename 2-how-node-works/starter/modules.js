// console.log(arguments)
// console.log(require('module').wrapper)

//module.exports
const Calculator =  require('./test-module-1');
const calculator1 = new Calculator();
console.log(calculator1.add(2,5));

//exports
// const calculator2 = require('./test-module-2');
//destructor, phải dùng tên khớp với tên trong module
const {add, multiply, divide} = require('./test-module-2');
console.log(multiply(2,5));

//cache
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()