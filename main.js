const express = require('express');
const path = require('path');
const fs = require('fs');
const si = require('serve-index');
const m = require('morgan');

var app = express();

var port = process.env.PORT || 3500;


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(m('combined', {stream: accessLogStream}));
app.use((req, res, next) => {
  proc.stdout.pipe(accessLogStream);
  proc.stderr.pipe(accessLogStream);
  next();
});

app.use('/', si(path.join(__dirname, 'shares'), {'icons': true}));
app.use('/shares', express.static(path.join(__dirname, 'shares')));
app.use('/logs', (req, res) => {
  res.sendFile('access.log');
});

app.listen(port, (err) => {
  if(err){
    consol.error(err.toString());
  }
  console.log(`SFS Running and listening for requestst on port: ${port}`);
});
