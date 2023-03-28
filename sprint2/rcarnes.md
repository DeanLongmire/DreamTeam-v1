# Sprint 2 - Dynprog
- Ryan Carnes
- Ryan-Carnes-01
- rcarnes
## What you planned to do
- Connect with Juliana's front end create_league.html and create_league.js
- Be able to parse JSON sent from front end and get user input into back end files
- Put user input from JSON into League database
- Be able to PATCH and update aspects of this league table
- Be able to remove leagues from table
## What you did not do
- I was not able to get to the PATCH and update functionality
- We were not able to implement the "remove league" functionality
## What problems you encountered
- Variable name mismatches between front and back end JSON handling created issues with how we passed data
- Name of League was not being stored properly (this is now fixed though as of 5 minutes ago after our demo)
- the way we were opening our databases had issues due to different pathnames
## Issues you worked on
- [Issue 29](https://github.com/utk-cs340-spring23/DynProg/issues/29)
- [Issue 30](https://github.com/utk-cs340-spring23/DynProg/issues/30) 
## Files you worked on
- DynProg/DreamTeam/Back-End/controllers/global_leagues.js
- DynProg/DreamTeam/Back-End/Leagues/global_leagues.js
- DynProg/DreamTeam/Back-End/Leagues/global_leagues_db.js
## What you accomplished
- Successfully able to pass info from Front End create_leagues.html/create_leagues.js to Back End global_leagues.js
- Successfully able to store this info into a database