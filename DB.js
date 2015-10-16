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
  client.hmset(qCount, "username", username, "question", question, "date", date, "QID", qCount);
};

console.log(qCount);

db.addAHash = function(username, answer, date, qid){
  aCount ++;
  var aCountID = "A"+aCount;
  client.hmset(aCountID, "username", username, "answer", answer, "date", date, "AID",aCountID, "QID", qid);
  console.log ("addAHash QID " + qid);
  console.log ("addAHash AID " + aCountID);
  client.zadd('answer', qid, aCountID);
};


db.lastFiveAs = function(qid, callbackA){
  //console.log('im in the getAnswers QID ' + qid);

    client.ZREVRANGEBYSCORE ('answer', qid, qid, function(err, replyAs){
          console.log('im in the getAnswers S.Set ' + replyAs);
          console.log('im in the getAnswers QID ' + qid);

          var i = replyAs.length;

      client.multi()
        .hgetall(qid)
        .hgetall(replyAs[i])
        .hgetall(replyAs[i-1])
        .hgetall(replyAs[i-2])
        .hgetall(replyAs[i-3])
        .hgetall(replyAs[i-4])
        .exec(function(err, repliesAs){
          console.log("In the As multi" + repliesAs);
          callbackA(repliesAs);
          return(repliesAs);
        })
    });

}


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

        callback(replies);
        return(replies);
  });


};

module.exports = db;
