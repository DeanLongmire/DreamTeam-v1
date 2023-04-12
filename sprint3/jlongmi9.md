# Sprint 3
* Dean Longmire - jlongmi9
* Github id: DeanLongmire
* Dynprog

### What you planned to do
* Issue [50](https://github.com/utk-cs340-spring23/DynProg/issues/50) : Create User Sessions And Cookies 
* Issue [36](https://github.com/utk-cs340-spring23/DynProg/issues/36) : Make Rest of Patch Functions For Users 
* Issue [21](https://github.com/utk-cs340-spring23/DynProg/issues/21) : Store Pictures In Database
* Issue [22](https://github.com/utk-cs340-spring23/DynProg/issues/22) : Authenticate User Login

### What you did not do
* Issue 22 is not fully done, we can store encoded strings that translate to images, but a better way to do it is to store references to images in the database

### What problems you encountered
* Cookies were a headache to figure out - Took a while to figure out that we need to disable httpOnly and secure settings, configure some CORS Policy settings, and transfer cookies over SameSite
* Trying to make website HTTPS was very complicated with getting certificates and allowing the browser to trust my CA. Ended up abandoning this as for demo and production purposes, it is not extremely neccessary

### Issues you worked on
* Issue [50](https://github.com/utk-cs340-spring23/DynProg/issues/50) : Create User Sessions And Cookies 
* Issue [36](https://github.com/utk-cs340-spring23/DynProg/issues/36) : Make Rest of Patch Functions For Users 
* Issue [21](https://github.com/utk-cs340-spring23/DynProg/issues/21) : Store Pictures In Database
* Issue [22](https://github.com/utk-cs340-spring23/DynProg/issues/22) : Authenticate User Login

### Files you worked on
From my commits.txt
* DreamTeam/Back-End/index.js
* DreamTeam/Back-End/controllers/global_users.js
* DreamTeam/Back-End/Leagues/global_teams.js
* DreamTeam/Back-End/Users/global_users.js
* DreamTeam/Back-End/Users/global_users_db.js
* DreamTeam/Back-End/Users/hash.js
* DreamTeam/Front-End/users/login.js
* DreamTeam/Front-End/users/Registry.js
* DreamTeam/Front-End/users/set_up_profile.js


### What you accomplished
Was able to successfully create a session for a user logging in or creating an account, pass this session ID back to the browser, and store it in a cookie. I also finished making patch functions for the rest of the user data so that we can have these working when we go to implement the updating features with the new cookies we have. I also figured out how to encode an image into a base64 string and decode it so we can have images sent across http requests. Lastly, I was able to implement user authentication with a valid email and password and give errors back to the client accordingly.
