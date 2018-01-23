const requestMethod = require('./index').handler;

requestMethod({}, {}, (nullValue, data) => {
  console.log('result: ' + JSON.stringify(data))
});
