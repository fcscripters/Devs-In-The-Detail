var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL, {
  no_ready_check: true
});
var db = {};
var aCount = 0;
var qCount = 0;


db.addQHash = function(username, question, date){
  console.log('im in the addQHash');
  qCount ++;
  client.hmset(qCount, "username", username, "question", question, "date", date);
};

db.addQHash("conor", "what day is it?", "08/04/14");
db.addQHash("dan", "what?", "08/05/14");
db.addQHash("tom", "why?", "08/05/14");
db.addQHash("bob", "where?", "08/05/14");
db.addQHash("conor", "what day is it?", "08/04/14");
db.addQHash("dan", "what?", "08/05/14");

console.log(qCount);

db.addAHash = function(username, answer, date, vote){
  aCount ++;
  client.hmset(aCount , "username", username, "answer", answer, "date", date, "vote", vote);
};

var QDataArr = [];
db.lastTenQs = function(qCount){
  console.log('im in the lastTenQs');
  var i = qCount;
  console.log(qCount);
  //this must happen for each of the last 10 Qs
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
        console.log('multi output=', replies);
        res.write(JSON.stringify(replies));
  });
};
db.lastTenQs(qCount);

module.exports = db;
