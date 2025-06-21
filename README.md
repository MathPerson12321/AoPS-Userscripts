# AoPS-Userscripts
These are some userscripts for the platform Art of Problem Solving.

To use these, you need a userscript manager, I prefer Tampermonkey (https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?pli=1), and need the corresponding pages open. It is recommended to fork this repository and edit the userscripts as you see fit.

This project is inspired by AoPS Enhanced and started as a Hackclub project.

# Explanations
# AoPS Ultimate Poster
This will post in multiple AoPS threads or topics as you want, with a certain post cooldown (keep it at minimum 30 seconds or 30000 milliseconds), and the message content you want. You are able to change the code to your liking and even dynamically change the message content. 

Examples are given with counters, one counts the successful posts sent by the bot, one counts the failed ones, and there is a random number generated each post. It also will put in the message a hide tag with the amount of posts the bot has done (after posting it). This only works for one thread right now, but I am working on this actively. Comments are given to help you understand the code, please read through all of them.

You can also add your own functions and call them when you want, all the counters are used for examples. Comments are in the code to help you understand what is going on at each section. NOTE - DO NOT CHANGE ANYTHING INSIDE THE DATA VARIABLE.

Extra - The array "arrayofposts" also contains all of the messages posted by the bot, you can add console.log(arrayofposts) somewhere in your code to see them.

# Setup
First fork the code into a code editor if possible. 
URL - This is the thread you want to post in. Make sure to open it in the big view.

Once this is done, and you are done editing your own code, install tampermonkey, make a new project, and replace all of the content with the code in the aops_ultimate_poster file. Change the name of the tampermonkey file with "AoPS Ultimate Poster" without quotes, and save it by pressing CTRL-S (Command S on MacOS). After that, reload the AoPS page, and it should run!

Note this is unethical and discouraged by AoPS, use this at your own risk.

In development - An option to quote the previous post in the thread, get the post numbers of the posts it has sent, the ability to post in multiple threads (with all of them open).

AI was used for the formatter function for ease of time.


