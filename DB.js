var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});
var db = {};
var aCount = 0;
var qCount = 0;


db.addQHash = function(username, question, date){
  console.log('im in the addQHash');
  console.log(qCount);
  qCount ++;
  client.hmset(qCount, "username", username, "question", question, "date", date);
};

console.log(qCount);

db.addAHash = function(username, answer, date){
  aCount ++;
  client.hmset(aCount , "username", username, "answer", answer, "date", date);
};

var QDataArr = [];
db.lastTenQs = function(callback){
  console.log('im in the lastTenQs');
  var i = qCount;
  console.log(qCount);
  client.multi()
    .hgetall(i)
    .hgetall(i-1)
    .hgetall(i-2)
    .hgetall(i-3)
    .hgetall(i-4)
    .hgetall(i-5)
    .hgetall(i-6)
    .hgetall(i-7)
    .hgetall(i-8)
    .hgetall(i-9)
    .exec(function(err, replies){

        callback(replies,qCount);
        return(replies);
  });


};

module.exports = db;
