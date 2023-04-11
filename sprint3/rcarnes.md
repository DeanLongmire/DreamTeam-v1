# Sprint 2 - Dynprog
- Ryan Carnes
- Ryan-Carnes-01
- rcarnes
## What you planned to do
- This sprint I planned to create the functionality for a new table in our database, the "player" table (which is separate from our users). This involved making the database control functions, the get/post/patch/delete functions, and the controller functions. I also wanted to go back and fix a few minor bugs from earlier sprints, like a problem with the league delete function.
## What you did not do
- I did not successfully get all of the information sent from the html form, there is something wrong with the back/front end communication.
## What problems you encountered
- Currently the only player information being stored is their ID, for some reason the forms are not also submitting the player name and position but I am currently working on figuring this out.
## Issues you worked on
- [Issue 45](https://github.com/utk-cs340-spring23/DynProg/issues/45)
- [Issue 46](https://github.com/utk-cs340-spring23/DynProg/issues/46)
- [Issue 47](https://github.com/utk-cs340-spring23/DynProg/issues/47)
## Files you worked on
- DynProg/DreamTeam/Back-End/controllers/global_players.js
- DynProg/DreamTeam/Back-End/Players/global_players.js
- DynProg/DreamTeam/Back-End/Players/global_players_db.js
## What you accomplished
- Went back and fixed the delete and patch functions for leagues.
- Added get, post, patch, delete functionality for players
- Added database handling for players