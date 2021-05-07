var app = require('./app');


const http = require('http');
const server = http.createServer(app);

try {
  server.listen(3000);
  console.log('Connect successful')
} catch (ex) {
  console.log('Connect error:' + ex)
}
