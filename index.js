var fs = require('fs');
var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var index = fs.readFileSync(__dirname + '/index.html');
var question = fs.readFileSync(__dirname + '/question.html');


function handler(req,res){

    if(req.method === "GET" && req.url === '/'){
      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(index);
    }
    else if(req.method === "GET" && req.url.indexOf('/question') > -1){
      var qid = req.url.split('/')[2].toString();

      res.writeHead(200,{"Content-Type":"text/html"});
      res.end(question);
    }
}

io.on('connection',manageConnection);
function manageConnection(socket){
  console.log('connected back to front for  a user');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message in',function(msg){
    console.log('message: ',msg);

    io.emit('message out', msg);
  });




}



server.listen(8000,function(){
  console.log('listening on server:8000');
});
