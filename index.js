var server = require('pushstate-server');

server.start({
  port: (process.env.PORT || 5000),
  directory: './build',
  file: '/index.html'
});
