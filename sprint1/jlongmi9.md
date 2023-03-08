# Sprint 1

Dean Longmire, DeanLongmire, DynProg

### What you planned to do
* Issue 9: Creating a table for the app users in the database https://github.com/utk-cs340-spring23/DynProg/issues/9
* Issue 10: Add users to table https://github.com/utk-cs340-spring23/DynProg/issues/10
* Issue 11: Delete users from the table https://github.com/utk-cs340-spring23/DynProg/issues/11

### What you did not do
* Was not able to allow these database functions to be done from the browser as I initially planned on being able to do by this point

### What problems you encountered
* Asynchronous code proved to be more difficult to wrap my head around
* Using Node.js files with HTML (Server-Side and Client-Side Communication) - was not able to just include JS files as I thought I would

### Issues you worked on
* Issue 9: Creating a table for the app users in the database https://github.com/utk-cs340-spring23/DynProg/issues/9
* Issue 10: Add users to table https://github.com/utk-cs340-spring23/DynProg/issues/10
* Issue 11: Delete users from the table https://github.com/utk-cs340-spring23/DynProg/issues/11
* Others: Never added this to the issues list but there were a variety of other database function that I worked on such as getting and changing data in the table

### Files you worked on
* DynProg/DreamTeam/Back-End/Users/global_users.js
* DynProg/DreamTeam/Back-End/Users/test.js
* DynProg/DreamTeam/Back-End/database.db
* DynProg/DreamTeam/Back-End/Users/test.html

### What you accomplished
I was tasked with creating and managing the User table in the database which holds the information of all users registered on the website. I made functions that were able to create, open, insert, delete, read, and edit the values of members in the table. This was all put in global_users.js with the intention of other Node.js files being able to refer to these functions for performing specific actions when needed. Some of the more in depth things that I had to code were the sychronous parts to these functions such as getting the ID of the last user in the database so that I can have the function automatically increment the ID by 1 so the user does not have to keep track of which ID they should have. In test.js, I tested using some of these functions as they may be used in the project. For example, I made a short chunk of code that took in a username and password and compared this users password in the database with the inputted one and allows them to perform actions if it was a successful login attempt. I also did other things such as using get functions to display user info when neccessary and testing how to perform functions in order with callbacks. 