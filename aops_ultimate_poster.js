// ==UserScript==
// @name        AoPS Ultimate Poster
// @namespace   https://github.com/MathPerson12321/AoPS-Userscripts
// @match       https://artofproblemsolving.com/*
// @grant       none
// @version     6.2.0
// @author      epiccakeking
// @description Posts for you with a message of your choice in multiple threads.
// @license     MIT
// @icon        https://artofproblemsolving.com/online-favicon.ico?v=2
// ==/UserScript==

//Note this uses AoPS HTML, and you must be on the topic you want to automatically post in. Upgrades will come soon.
//Elements from this are inspired from AoPS Enhanced.
//There is a 25 second cooldown, the default by AoPS, plus five to avoid lag.
//A setting to quote the previous post and edit it will come soon.



(function () {
    'use strict';
  
    //Counters
    let counter = 0; //You can make counters to achieve a purpose, for example, this one tracks the amount of posts the bot does successfully.
    let errors = 0; //Amount of time the bot fails to post.
    let random = Math.floor(Math.random()*10)+1; //Random number from 1 to 10.
    //You can add your own and make them function, very basic knowledge of javascript needed for this.

    let arrayofposts = []; //Array of all posts sent and their message content.

    let message = "Message you want to send."; //You can change this before running it, bbcode tags work as above.
    //This may get long so feel free to break it apart as shown below.
    message += "\n" + "Random integer: " + random; //Adds the random integer to the message content.
    message += "\n [hide=Post number "+(counter+1)+"]Done by the bot[/hide]"; //Adds a hide tag with the amount of posts the bot has done after sending.\
    //Note these are examples and you can manipulate these how you want, as long as they function.

    //BBcode stuff - these are used for a bit of variations to posts.
    //"[quote]" and "[/quote]" are the tags for a quote. You can add "[quote=user]" where user is the person you quote.
    //"[hide]" and "[/hide]" are used for hidden text. You can add "[hide=Something]" where something is the text shown in the hide box (which you click to show hidden text).
    //These are examples, any of these work, as long as the bbcode is right. You can also add asymptote but be warned when using it.

    const interval = 30000; //Milliseconds
    const minPostLength = AoPS.Community.Constants.min_post_length; //This is eight characters
  
    //Check if you can post - on the right page
    function canPost() {
      return AoPS?.Community?.topicView?.replyBox &&
             AoPS.Community.topicView.replyBox.el &&
             AoPS.Community.topicView.replyBox.el.offsetParent !== null &&
             AoPS.Community.topicView.replyBox.$el.is(":visible");
    }
  
    //Send messages
    function postMessage() {
      //Are you on the right page?
      if(!canPost()){
        console.warn("Cannot post: reply box not available.");
        errors += 1;
        return;
      }
  
      const replyBox = AoPS.Community.topicView.replyBox;
      const now = Date.now();
  
      if(!replyBox.model.get("isSending") && message.length >= minPostLength){ //Checking if the message will send
        replyBox.setText(message);
        replyBox.send();

        console.log("[Bot] Posted at " + new Date().toLocaleTimeString());

        counter += 1;
        random = Math.floor(Math.random()*10)+1;
        arrayofposts.unshift(message);
      }else{
        console.warn("[Bot] Skipped post. Maybe on cooldown or message too short.");
        errors += 1;
      }
    }
  
    //Start interval posting
    setInterval(postMessage, interval);
  })();