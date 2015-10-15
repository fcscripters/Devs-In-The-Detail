var fs = require('fs');
var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var db = require('./DB.js');
var index = fs.readFileSync(__dirname + '/index.html');
var answers = fs.readFileSync(__dirname + '/answers.html');
var port = process.env.PORT || 8000;

function handler(req, res) {

  if (req.method === "GET" && req.url === '/') {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(index);
  } else if (req.method === "GET" && req.url.indexOf('/questions') > -1) {
    var qid = req.url.split('/')[2].toString();
    console.log(qid);
    res.write(answers);
    res.end();
  } else {
    fs.readFile(__dirname + req.url, function(err, file) {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/" + ext
        });
        console.log('error:' + err);
        res.end();
      } else {
        var ext = req.url.split('.')[1];
        res.writeHead(200, {
          "Content-Type": "text/" + ext
        });
        res.end(file);
      }
    });
  }
}

//this is for questions index.html
io.on('connection', manageConnection);

function manageConnection(socket) {
  console.log('connected back to front for  a user');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('message in', function(msg) {
    console.log(msg);
    db.addQHash('User', msg, '01/01/2000');

    db.lastTenQs(lastTenQsCallback);
    function lastTenQsCallback(replies, qCount) {
      io.emit('message out', replies, qCount);
    }
  });

  socket.on('answer in', function(answer) {
    console.log(answer);
    db.addAHash('User', answer, '01/01/2000');
    io.emit('answer out', answer);
  });
}
server.listen(port, function() {
  console.log('listening on server:8000');
});
