var fs = require('fs');
var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var db = require('./DB.js');
var env = require('env2')('./config.env');
var querystring = require('querystring');
var https = require('https');
var index = fs.readFileSync(__dirname + '/index.html');
var answers = fs.readFileSync(__dirname + '/answers.html');
var port = process.env.PORT || 8000;
console.log(process.env.clientID);
var sessions = {};

function handler(req, res) {
  var urlArray = req.url.split('/');
  console.log(req.url);

  if (req.method === "GET" && req.url === '/') {
    var redirect = "https://github.com/login/oauth/authorize";
    var idStr = "?client_id=" + process.env.clientID;
    //in redirecte uri in your site add /auth/?code= then the code
    res.writeHead(302, {
      "Location": redirect + idStr
    });
    res.end();
  }else if (req.url.match(/^(\/auth\/)/)){
    console.log('this is authorisation');
    getToken(urlArray[2].split('=')[1], function(data){
            // TODO: check for conflict
            setToken(data, res, getUserData);
          });
    }

    else if (req.url === '/show-me') {
      res.end(req.headers.cookie + ' ' + sessions[req.headers.cookie.split('access=')[1]]);
    }
 else if (req.method === 'GET' && req.url === '/topten') {
    db.lastTenQs(function(replies, qCount) {
      var filterReply = replies.filter(function(Qobj) {
        return Qobj;
      });
      res.end(JSON.stringify(filterReply));
    });
  } else if (req.method === "POST" && req.url.indexOf('/questions') > -1) {
    var qid = req.url.split('/');
    //('/')[2].toString();
    console.log("Im in the GET Request questions From FrontEnd" + qid);
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
    //console.log(msg);
    db.addQHash('User', msg, '01/01/2000');

    function lastTenQsCallback(replies) {
      io.emit('message out', replies);
    }
    db.lastTenQs(lastTenQsCallback);
  });

  socket.on('answer in', function(answer) {
    //console.log(answer);
    db.addAHash('User', answer, '01/01/2000');
    io.emit('answer out', answer);

    /*
              function lastTenQsCallback(replies) {
                  io.emit('message out', replies);

                  db.lastTenQs(lastTenQsCallback);
             });*/

  });
}


function setToken(gitToken, res,callback){

  var cookie = Math.floor(Math.random() * 100000000);
  var access_token = gitToken.split('=')[1].split('&')[0];
  sessions[cookie] = access_token;
  sessions.token = access_token;
  res.writeHead(200, {
    "Set-Cookie": 'access=' + cookie
  });
  callback();
  res.end(index);

  // var token = jwt.encode({
  //   iss: 7
  // });
}

var getUserData = function(){

  var optionsuser = {
    hostname: 'api.github.com',
    path: '/user?access_token='+ sessions.token ,
    method: 'GET'
  };
  var body = '';
  var userReq = https.request(optionsuser,function(res){
    res.on('data',function(chunk){
      body += chunk;
    });
    res.on('end',function(){
      console.log(body);
      var username = JSON.parse(body);
      var name = username.login;
      console.log(name);

    });
  });
  userReq.setHeader('User-Agent','Devs-In-the-Detail');
  userReq.end();

};


var getToken = function(code, callback){
  console.log('gitHub code: \"'+code+"\"");
  var postData = querystring.stringify({
    client_id: process.env.clientID,
    client_secret: process.env.clientSecret,
    code: code
  });

  var options = {
    hostname: 'github.com',
    path: '/login/oauth/access_token' ,
    method: 'POST'
  };

  var req = https.request(options, function(res){
    console.log('github return statusCode: ' + res.statusCode);
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      // var access_token = ;
      // function setCookie() {
      //   var rnd = Math.floor(Math.random() * 100000000);
      //   if (!sessions[rnd]) sessions[rnd] = access_token;
      //   else setCookie();
      // }
      callback(body);
    });
  });
  req.end(postData);
};


server.listen(port, function() {
  console.log('listening on server:' + (process.env.PORT || 8000));
});
