const open = require('open');

var myArgs = process.argv;

if (myArgs.includes('full')) {
  open(__dirname + '/jest/index.html');
  open(__dirname + '/jest/reporter.html');
} else {
  if (myArgs.includes('coverage')) open(__dirname + '/jest/index.html');
  if (myArgs.includes('reporter')) open(__dirname + '/jest/reporter.html');
}
