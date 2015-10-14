var fs = require('fs');
var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var db = require('./DB.js');
var index = fs.readFileSync(__dirname + '/index.html');
var question = fs.readFileSync(__dirname + '/question.html');

function handler(req,res){

    if(req.method === "GET" && req.url === '/'){
      res.writeHead(200,{"Content-Type": "text/html"});
      res.end(index);
    }
    else if(req.method === "GET" && req.url.indexOf('/questions') > -1){
      var qid = req.url.split('/')[2].toString();
      console.log(qid);
      res.write(question);
      res.end();
    }
    else {
         fs.readFile(__dirname +req.url, function(err, file) {
             if (err) {
                 res.writeHead(404, {
                     "Content-Type": "text/" + ext
                 });
                 console.log('error:'+err);
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

io.on('connection',manageConnection);
function manageConnection(socket){
  console.log('connected back to front for  a user');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('message in',function(msg){
    db.addQHash('User',msg, '01/01/2000');
    function lastTenQsCallback (replies){
      io.emit('message out', replies);
    }
    db.lastTenQs(lastTenQsCallback);
  });
}

server.listen(8000,function(){
  console.log('listening on server:8000');
});
