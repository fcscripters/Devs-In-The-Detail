# Devs-In-The-Detail

Visit the Heroku build [here](https://fast-taiga-6303.herokuapp.com)


[![Build Status](https://travis-ci.org/fcscripters/Devs-In-The-Detail.svg)](https://travis-ci.org/fcscripters/Devs-In-The-Detail)
[![Test Coverage](https://codeclimate.com/repos/561d10c469568062bf001a3f/badges/ca82653db8721ed73fcc/coverage.svg)](https://codeclimate.com/repos/561d10c469568062bf001a3f/coverage)
[![Code Climate](https://codeclimate.com/repos/561d10c469568062bf001a3f/badges/ca82653db8721ed73fcc/gpa.svg)](https://codeclimate.com/repos/561d10c469568062bf001a3f/feed)
[![bitHound Score](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/badges/score.svg)](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail)
[![bitHound Dependencies](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/badges/dependencies.svg)](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/master/dependencies/npm)
[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/fcscripters/Devs-In-The-Detail/master)


## Welcome to the first in the series of DIY tutorials by FCscripters

#### This Tutorial will take you through the process of creating a StackOverflow clone, albeit a very simple one. But in the process you will learn the following:

 * Use Socket.io for real time updates using pure Node ( No Frameworks! )
 * Authenticate users on the website, using OAuth2
 * Setup a Redis Database
 * Protect against script injections  

#### Note this tutorial is not for complete begginers, it will require you to research each topic on your own, don't expect to be fed all the code as you follow along, you could cheat by looking into the files above, but that won't be fun for any of us. But, if you find the tutorial lacking in any way, then please create an issue so that it improves over time.

##### Step 1 -  Setup Basics

- You will need to create a new repo on your on github and initialise with a readme.md, so that you can create an improved version of this tutorial!
- Clone the repo and setup node using `npm init`
- install the following dependencies/devDependencies, i'll leave it to you to figure out which ones are dev only dependencies:
  - istanbul (for coverage)
  - socket.io (realtime connection)
  - redis (database)
  - shot (server testing)
  - tape (testing)
  - env2 (secret stuff!)
- create a .gitignore file and add the following three items `1 - node_modules 2 -  
dump.rdb 3 -
config.env`  

##### Step 2 - Create Basic Server

- create an index.js which should house our handler function, backend socket.io connection and start our server.
 - we recommend following socket.io's tutorial on real time chat [link here][http:socket.io]. This will improve your understanding of how socket.io works with node trumendously.
- If the above tutorial is followed correctly then you should have a simple page that can write messages instantly in the frontend.

##### Step 3 - Setup Database

- few points about what tables we need to set up. dont give all details.
- Setup a Questions Hash which should take username, question and Date.
- Setup a Anwers Hash which should take username, question and Date.
- Create a function that returns the latest 10 questions from the database.
- Create a Sorted Set which links questionID to answerID so that at a later stage we can retreive all the answers related to a question.
- Create another sorted set for incrementing the score of each answer if it is up/down voted.
- View our DB.js file for reference.
- Anything else guys???????


##### Step 4 - Join Server and Database so that user entries are saved into the database

- export the functions created in DB.js (`module.exports`) into index.js
- inside your socket in index.js which is receiving messages, add the database function which add's the user entered detail into the database, for now it should look something like this: ` db.addQHash("your name", msg, new Date());` Don't worry, the username will be added automatically once we have implemented authentication.
- In the emitter that is sending the messages back out, you should add your function that returns the latest ten questions. ours looks something like this:
```javascript
function lastTenQsCallback(replies) {
  io.emit('message out', replies);
}
db.lastTenQs(lastTenQsCallback);
```

##### Step 5 - Frontend Javascript Extras

- Make sure your Javascript file has been linked to the index.html file and is being read by node in backend. (see our else loop in index.js for help).
- You should already have this javascript as it was required to set up socket.io.
- we need to add a few AJAX requests so that the questions load instantly in frontend without having to actually ask a question first.
```javascript
var requestOnload = new XMLHttpRequest();
requestOnload.onreadystatechange = function() {
  if (requestOnload.readyState === 4) {
    array = JSON.parse(requestOnload.responseText);
    console.log(array);
    for (var i=0 ; i<10 ; i++){
      messages.innerHTML += ("<li id = 'li1'>From "+array[i].username+" on "+array[i].date+' Question: '+array[i].question+"</li>");
    }
  }
}
requestOnload.open("GET","/topten", true);
requestOnload.send();
```
- You are all set, if you run the server now, it will show all the questions on load, and then if you add a question, that should be appended to the top of the list.

##### Step 6 - Authentication

- we will be using oAuth2 for Authentication along with github as the third party
    - Github have some information in how to set up authentication [link](https://developer.github.com/v3/oauth/)
    - register application with github, for now use url as http://localhost:'yourport'
    - add the client_id and client_secret to our config.env file so that they are hidden.
    - ![image](https://github-cloud.s3.amazonaws.com/assets/11330267/10565434/e5be1a86-75c7-11e5-8f7f-6c5d08606c79.png)

![image](https://github-cloud.s3.amazonaws.com/assets/11330267/10565437/ef3fa9ee-75c7-11e5-8aa2-9d355f9971c0.png)

   
Next we need to make changes to out handler, so that the first thing that happens once they enter our site address is they get redirected to githubs authentication url - `https://github.com/login/oauth/authorize`, hint - you need to change the first if statement in your handler.

![image](https://github-cloud.s3.amazonaws.com/assets/11330267/10565494/352eec98-75c9-11e5-8d54-37ed7f645f01.png)


##### Step ? - Clean Up code ????
-   It's time we go back and have a look at all the functions we have created our



READ ME Tutorial  Detail in the dev.


Create a Repo , clone the repo onto your computer.

Create a Git Ignore file add node_modules,  environment variables, ( have pic of git ignore)

Got to working Directory NPM INIT to get your node modules in your command line, and JSON package. (you can keepp pressing enter).

Now we're going to install the dependencies for project.

In command line:  npm install redis --save

Next save dev dependencies , in command line : npm install tape --save-dev
do the same for 'shot', 'istnanbul'  ( screen shot of Package JSON)

Next Setup your Continous intergration testing with Travis (follow steps in tutorial)- open an account with Git Hub and find your repo - sync with Traivs.

Go back to your package JSON and make sure your  TEST:  correlates to what is in the tutorial.  

Get your badge in markdown and add it to the top of your repo

Do the same for Code climate - follow tutorial here.

Create a databae.js file, You must require redis and defne a client variable.

Create an empty object to attach your database function to.

Add an module eexport function at the bottom of your file so other files can use your database object.

First create an addQuestion function , with the Key name as Qid and the keys as; username, question, date.

Second create an addAnswer function,  with the key name as  Aid and the keys as username, answer, date, vote.




we will be creating a simplified version of Stack Overflow, where developers can ask questions, other users can then answer these questions in real time. The answers can be voted on, the answers are then ordered by the number of up votes they have.


In this process we will create a tutorial detailing how to;
* Use Socket.io for real time updates
* Authenticate users on the website, using OAuth2
* Setup a Redis Database
* Protect against script injections
* Create tests which cover the code fully
* Implement continous integration
