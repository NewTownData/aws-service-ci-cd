const http = require('http');

const message = `Code Version: 1.0.0
Build Version: ${process.env.BUILD_VERSION}
Deployment Version: ${process.env.DEPLOYMENT_VERSION}
`;

console.log('Starting server...');
console.log(message);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(message);
  res.end();
}).listen(8080);
