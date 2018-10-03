let moment = require('moment');

let TS = moment().valueOf();
console.log(TS)

//let createdAt = 1234;
//var date = moment(createdAt);
var date = moment();
console.log(date.format('MMM Do YYYY, h:mm:ss'));

console.log(date.format("MM Do YYYY h:mm a"));

console.log(date.format("MM/DD/YYYY hh:mm:ss A"));

console.log(date.format("M--d--YY hh:mm:ss A"));

date.add(110, 'year');
console.log(date.format('MMM Do YYYY, h:mm:ss'));
