# Sprint 4
* Dean Longmire - jlongmi9
* Github id: DeanLongmire
* Dynprog

### What you planned to do
* Issue [21](https://github.com/utk-cs340-spring23/DynProg/issues/21) : Store and Display Profile Pictures 
* Issue [50](https://github.com/utk-cs340-spring23/DynProg/issues/50) : Rework Sessions
* Issue [58](https://github.com/utk-cs340-spring23/DynProg/issues/58) : Display User Data To Website
* Issue [59](https://github.com/utk-cs340-spring23/DynProg/issues/59) : Logout Users And Delete Sessions 
* Issue [60](https://github.com/utk-cs340-spring23/DynProg/issues/60) : Update User Data From Website

### What you did not do
* User is successfully logged out but the sessions are still in the store, need to remove these when a user logs out

### What problems you encountered
* The session store I was using, better-sqlite-3 session store, was giving me problems without knowing it. I eventually found out and then coded my own session store using sqlite3
* Some pictures are too big to send in an HTTP header so we need to implement a way to let the user know if their file is invalid

### Issues you worked on
* Issue [21](https://github.com/utk-cs340-spring23/DynProg/issues/21) : Store and Display Profile Pictures 
* Issue [50](https://github.com/utk-cs340-spring23/DynProg/issues/50) : Rework Sessions
* Issue [58](https://github.com/utk-cs340-spring23/DynProg/issues/58) : Display User Data To Website
* Issue [59](https://github.com/utk-cs340-spring23/DynProg/issues/59) : Logout Users And Delete Sessions 
* Issue [60](https://github.com/utk-cs340-spring23/DynProg/issues/60) : Update User Data From Website

### Files you worked on
From my commits.txt
* DreamTeam/Back-End/index.js
* DreamTeam/Back-End/controllers/global_users.js
* DreamTeam/Back-End/controllers/global_leagues.js
* DreamTeam/Back-End/Leagues/global_leagues_db.js
* DreamTeam/Back-End/Users/global_users.js
* DreamTeam/Back-End/Users/global_users_db.js
* DreamTeam/Back-End/sessions_db.js
* DreamTeam/Front-End/users/profile.js
* DreamTeam/Front-End/home/index.js
* DreamTeam/Front-End/users/set_up_profile.js


### What you accomplished
As I said earlier, I had to create my own session store because the one I was using was causing unexpected behavior. I also was able to make a series of fetch requests to both user get data to display on the website and make patch requests on an update page. Along with this was the implementation of uploading profile pictures and encoding them to send to the back end where they are then decoded and stored. They then are encoded again and sent back to the front end for display. Lastly, the user is now able to log out by deleting the cookies when they hit log out.
