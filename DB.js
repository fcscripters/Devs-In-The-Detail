var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});
var db = {};
//var Qid= 1;//for test
var aCount = 0;
var qCount = 0;
db.addQHash = function(username, question, date){
  console.log('im in the addQHash');
  qCount ++;
  client.hmset(Qcount, "username", username, "question", question, "date", date);
};
//db.addQHash(Qid , "username", 'Conor', "question", 'Is this working', "date", '13/10/15');

db.addAHash = function(username, answer, date, vote){
  aCount ++;
  client.hmset(aCount , "username", username, "answer", answer, "date", date, "vote", vote);
};


db.lastTenQs = function(date, username, question){
  client.lrange('Qids', 0, 9, function(err,reply){
    var frontarr = [];
    var counter = 0;
    reply.forEach(client.hgetall(keyName, function(err, obj){
      frontarr.push(obj);
    }););
  });
};








module.exports = db;
