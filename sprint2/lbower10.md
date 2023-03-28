# Sprint 2
* Logan Bowers
* Github id: lbower10
* Dynprog

## What you planned to do
* I had planned to do user log ins and bridge the front and back end, however Dean found a good way of doing these things,
so that role was passed to him. Howver, using services like Postman and sqlite, I was able to help with testing for these features.
* Later in the sprint, it was decided that I would add functionality for [creating teams and storing them in our
database](https://github.com/utk-cs340-spring23/DynProg/issues/28), similar to how this functions for creating users and leagues.
* I also wrote functions for teams in the controllers folder that integrate with the database functions written in global_teams_db.js.

## What you did not do
* Was not able to bridge the fron/back end and log users in the way I had originally planned. However, this is not a big concern anymore,
given that our team has found a new method to accomplish this task and has shown effective. We will probably add more functionality and
clean certain files up a bit during this next sprint.

## What problems you encountered
* A few problems that I encountered really stemmed from not having callback functions in certain code blocks, and a few syntax and variable name errors. Overall, these problems arose and were solved fairly quickly.

## Issues you worked on
* [Create teams and insert them into the database](https://github.com/utk-cs340-spring23/DynProg/issues/28)
* Helped with testing for the following issues
    - [Bridge back end and front end](https://github.com/utk-cs340-spring23/DynProg/issues/17)
    - [Creating leagues and inserting them into database](https://github.com/utk-cs340-spring23/DynProg/issues/29)

## Files you worked on
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/controllers/global_teams.js
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/Teams/global_teams_db.js
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/Teams/teams.js
* utk-cs340-spring23/Dynprog/DreamTeam/Front-End/create_player.js -> however, this file may not be necessary, and may be removed.

## What you accomplished
* The biggest accomplishment for me was successfully being able to create and insert teams into our teams database. This was accomplished with get, post, patch, etc operations that were tested with Postman. There will definitely be some cleaning up and verification to try and accomplish for sprint 3.