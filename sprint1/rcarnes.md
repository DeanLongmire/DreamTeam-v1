# Sprint 1 - Dynprog
Ryan Carnes
Ryan-Carnes-01
rcarnes
## What you planned to do
- Add functionality for interacting with League table in database. This includes creating the table, adding entries to it, editing those entries, deleting those entries, and dropping the table.
- Add functionality for interacting with Teams table in database
- Add functionality for interacting with Players table in database
## What you did not do
- The user cannot interact with the database through the back end since it is not yet connected to the front end
- I also need to change how I am updating the entries in the tables, since I am currently doing it by the name instead of the unique integer ID of the entry.
## What problems you encountered
- Understanding how event-based asynchronous Javascript works has and is an ongoing process, leading to new problems that I have not had to deal with before just due to it's asynchronous nature.
- Understanding how all the different pieces and technologies we are using come together to form a working web app is another challenge that is continually being worked on. It's one thing to understand my small role and piece of the puzzle, but it's another to understand how that plays into the bigger picture.
## Issues worked on
- Issue 12: Create tables and add Leagues/Teams/Players to tables. This is working correctly independantly. https://github.com/utk-cs340-spring23/DynProg/issues/12
- Issue 13: Update and edit entries in League/Team/Player tables. Also working independantly. https://github.com/utk-cs340-spring23/DynProg/issues/13 
- Issue 14: Delete entries from League/Team/Player tables and drop tables. Working independently. https://github.com/utk-cs340-spring23/DynProg/issues/14 
## Files worked on
- DreamTeam/Back-End/Leagues/global_leagues.js
- DreamTeam/Back-End/Teams/global_teams.js
- DreamTeam/Back-End/Players/global_players.js
## What you accomplished
- I managed to wrap up the functionality for each major category (league/team/player) into it's own class for easy management and use throughout the project. Each class manages and holds the functionality for interacting with the database for all aspects other than our users.