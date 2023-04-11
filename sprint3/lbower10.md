# Sprint 3
* Logan Bowers
* Github id: lbower10
* Dynprog

## What you planned to do
* Create functionality to update Win column for teams in our database
* Create functionality to update Loss column for teams in our database
* Create functionality to update Team Name column for teams in our database

## What you did not do
* We are still only able to test this functionality through postman, rather than our actual website. So we would like to have that functionality soon.

## What problems you encountered
* Had to fix a few syntax and logic errors, such as:
    - Getting the patch routes in teams.js correct
    - Including the database callback function in newly written functions
    - Taking into account that we are no longer using https, but rather just http

## Issues you worked on
* Make More Columns in Teams DB: [Issue #32](https://github.com/utk-cs340-spring23/DynProg/issues/32)
* Check PATCHES, and make new ones for new columns: [Issue #32](https://github.com/utk-cs340-spring23/DynProg/issues/33)
* DELETE Teams Function: [Issue #34](https://github.com/utk-cs340-spring23/DynProg/issues/34)

## Files you worked on
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/Teams/global_teams_db.js
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/Teams/teams.js
* utk-cs340-spring23/Dynprog/DreamTeam/Back-End/Controllers/global_teams.js

## What you accomplished
* Able to now delete teams from the database
* Added W and L columns in the teams database
* Able to now update Wins and Losses columns in the database
