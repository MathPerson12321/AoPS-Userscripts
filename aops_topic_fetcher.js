// ==UserScript==
// @name        AoPS Topic Fetcher
// @namespace   https://github.com/MathPerson12321/AoPS-Userscripts
// @match       https://artofproblemsolving.com/*
// @grant       none
// @version     6.2.0
// @author      MathPerson12321
// @description Fetch all the posts from a topic or PM and update the thread
// @license     MIT
// @icon        https://artofproblemsolving.com/online-favicon.ico?v=2
// ==/UserScript==

//Upgrades will come soon by user request.
//Elements from this are inspired from AoPS Enhanced.
//Do not keep the cooldown very low as it will lag AoPS.
//Might not be the best way to do this but it works.

//Instructions in github

(async function() {
    'use strict';

    //For a PM, go to any PM in the main tab (open one of them).
  
    //Constants - fill these out
    const url = ""; //Url of the topic you want to fetch.
    const fetchIntervalSeconds = 15; //Seconds
  
    const id = getTopicId(url);
    if (!id) {
      console.error("Missing topic URL.");
      return;
    }

    const category = getCategoryId(url);
    if (!category) {
      console.error("Missing topic URL.");
      return;
    }
      
    function fetchTopics(category,id){
        //Fetch all new topics in PMs.
        let data = {}
        if(category == 1){
            //Data
            data = new URLSearchParams({
                category_type: "my_privates",
                log_visit: "0",
                user_id: "0",
                fetch_archived: "0",
                fetch_announcements: "0",
                categord_id: category, //Should be 1
                a: "fetch_topics",
                aops_logged_in: true,
                aops_user_id: AoPS.session.user_id,
                aops_session_id: AoPS.session.id
            });
        }else{
            //Data
            data = new URLSearchParams({
                category_type: "forum",
                log_visit: "1",
                user_id: "0",
                fetch_archived: "0",
                fetch_announcements: "1",
                categord_id: category,
                a: "fetch_topics",
                aops_logged_in: true,
                aops_user_id: AoPS.session.user_id,
                aops_session_id: AoPS.session.id
            });
        }
        fetchServer(data)
    }

    //Fetch from the server
    function fetchServer(data){
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
        })
            .catch(err => {
            console.error('Post Error:', err);
        });
    }
    //Get category ID
    function getCategoryId(url){
        const match = url.match(/c(\d+)/);
        if(!match[1]){
          return null;
        }
        return match[1];
    }
      
    //Get topic ID
    function getTopicId(url){
      const match = url.match(/h(\d+)/);
      if(!match[1]){
        return null;
      }
      return match[1];
    }
  
    setInterval(fetchTopics,fetchIntervalSeconds*1000);
  })();