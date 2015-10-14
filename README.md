# Devs-In-The-Detail


[![Build Status](https://travis-ci.org/fcscripters/Devs-In-The-Detail.svg)](https://travis-ci.org/fcscripters/Devs-In-The-Detail)
[![Test Coverage](https://codeclimate.com/repos/561d10c469568062bf001a3f/badges/ca82653db8721ed73fcc/coverage.svg)](https://codeclimate.com/repos/561d10c469568062bf001a3f/coverage)
[![Code Climate](https://codeclimate.com/repos/561d10c469568062bf001a3f/badges/ca82653db8721ed73fcc/gpa.svg)](https://codeclimate.com/repos/561d10c469568062bf001a3f/feed)
[![bitHound Score](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/badges/score.svg)](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail)
[![bitHound Dependencies](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/badges/dependencies.svg)](https://www.bithound.io/github/fcscripters/Devs-In-The-Detail/master/dependencies/npm)

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
