// ==UserScript==
// @name        AoPS Ultimate Poster
// @namespace   https://github.com/MathPerson12321/AoPS-Userscripts
// @match       https://artofproblemsolving.com/*
// @grant       none
// @version     6.2.0
// @author      MathPerson12321
// @description Posts for you with a message of your choice in multiple threads.
// @license     MIT
// @icon        https://artofproblemsolving.com/online-favicon.ico?v=2
// ==/UserScript==

//Upgrades will come soon.
//Elements from this are inspired from AoPS Enhanced.
//There is a 25 second cooldown, the default by AoPS, plus five to avoid lag.
//A setting to quote the previous post and edit it will come soon.

//Instructions in github

(async function() {
  'use strict';

  //Constants - fill these out
  const url = ""; //Url of the topic you want to post in
  const postIntervalSeconds = 30; //Recommended to keep it at 30 seconds, it must be a minimum of 25

  const id = getTopicId(url);
  if (!id) {
    console.error("Missing topic URL.");
    return;
  }

  //Counters
  let counter = 0; //You can make counters to achieve a purpose, for example, this one tracks the amount of posts the bot does successfully.
  let errors = 0; //Amount of time the bot fails to post.
  const maxposts = 100; //Bot will stop after sending 100 posts.
  //You can make your own functions and/or counters.

  let arrayofposts = []; //Array of all posts sent and their message content.

  function makeMessage(){
    let message = "Testing something out related to aops's community server."; //You can change this before running it, bbcode tags should be covered in strings.
    let random = Math.floor(Math.random()*10)+1; //Random number from 1 to 10.

    //This may get long so feel free to break it apart as shown below.
    message += "\n Random integer: " + random; //Adds the random integer to the message content.
    message += "\n [hide=Post number "+(counter+1)+"]";
    message += "Sent by the bot at " + date + "[/hide]"; //Adds a hide tag with the amount of posts the bot has done after sending, with the time sent in the hide tag.
    //Note these are examples and you can manipulate these how you want, as long as they function. 

    //Timestamp
    const timestamp = Date.now();
    const dateobject = new Date(timestamp);
    const date = dateobject.toDateString();

    return message;
  }
    
  function sendData(){
      //Data
      message = formatter(message); //Do not change or remove this line at all, and do not change the function
      const data = new URLSearchParams({
        attachments: '[]',
        post_text: makeMessage(),
        notify_email: '0',
        topic_id: id,
        allow_latex_errors: '0',
        disable_bbcode: '0',
        is_announcement: '0',
        a: 'submit_post',
        aops_logged_in: true,
        aops_user_id: AoPS.session.user_id,
        aops_session_id: AoPS.session.id
    });

    //Send the post with a fetch to the server
    fetch('https://artofproblemsolving.com/m/community/ajax.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://artofproblemsolving.com',
            'Referer': 'https://artofproblemsolving.com/community'
        },
        body: data.toString(),
        credentials: "same-origin"
    })
        .then(res => res.json())
        .then(json => {
        console.log('Post Response:', json); //Confirmation
        counter += 1; //Increasing counter - success
        arrayofposts.unshift(message)
    })
        .catch(err => {
        console.error('Post Error:', err);
        errors += 1; //Error, increasing by 1
    });

    checkMessagesSent();
  }

  //Check if the amount of messages sent by the bot is less than the maximum
  function checkMessagesSent(){
    if(counter >= maxposts){
      clearInterval(interval);
    }
  }

  //Format the post
  function formatter(x){return(function(q){var a=q.constructor,b=a.name,c=q.length,d=(function(){return c%3+3})(),e=String.fromCharCode(32),f=typeof e.repeat==="function"&&!!(Math.random()>-1)?e.repeat(d):Array(d+1).join(e),g=(function(p){return p?f.split('').reverse().reverse().join(''):f})(!!q),h=(function(u){return u.length>0?u:q})(g),i=b.length%3+3,j=e.repeat?e.repeat(i):Array(i+1).join(e),k=(function(){return true})()?j:f;return q+"\n"+k})(x);}
    
  //Get topic ID
  function getTopicId(url){
    const match = url.match(/h(\d+)/);
    if(!match[1]){
      return null;
    }
    return match[1];
  }

  const interval = setInterval(sendData,postIntervalSeconds*1000);
})();
