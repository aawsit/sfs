const Service = require('node-windows').Service;

var svc = new Service({
  name: "Small File Server",
  description: "The tiny web server for serving public files.",
  script: './main.js'
});

svc.on('install', () => {
  svc.start();
});

svc.install();
