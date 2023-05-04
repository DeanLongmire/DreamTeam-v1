const teamList = document.getElementById('team-container');
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const tdb = new sqlite3.Database(path.join(__dirname, '../Teams/global_teams_db.db'));
// const teams = [
//   { name: 'Team A', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
//   { name: 'Team B', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
//   { name: 'Team C', sport: 'Softball', num_players: 9, W: 3, L: 4 },
//   { name: 'Team D', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
//   { name: 'Team E', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
//   { name: 'Team F', sport: 'Softball', num_players: 9, W: 3, L: 4 },
//   { name: 'Team G', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
//   { name: 'Team H', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
//   { name: 'Team I', sport: 'Softball', num_players: 9, W: 3, L: 4 },
//   { name: 'Team J', sport: 'Flag Football', num_players: 10, W: 5, L: 2 },
//   { name: 'Team K', sport: 'Men\'s Soccer', num_players: 11, W: 7, L: 3 },
//   { name: 'Team L', sport: 'Softball', num_players: 9, W: 3, L: 4 },
//   // add more teams here
// ];

const sqlite3 = require('sqlite3').verbose();

// Create a new database object
const db = new sqlite3.Database('your-database-name.sqlite');

// Retrieve the team information from the database
db.all('SELECT * FROM Teams', (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }

  // Generate a list of team names
  const teamList = rows.map(row => `<li>${row.name}</li>`).join('');

  // Add the list of team names to the HTML document
  const teamListElement = document.getElementById('team-list');
  teamListElement.innerHTML = teamList;
});







// function fetchTeams(callback) {
//   const teams = [];
//   tdb.serialize(() => {
//     tdb.each(`SELECT name, sport, num_players, W, L FROM Teams`, (err, row) => {
//       if (err) {
//         console.error(err.message);
//       }
//       else {
//         teams.push({
//           name: row.name,
//           sport: row.sport,
//           num_players: row.num_players,
//           W: row.W,
//           L: row.L
//         });
//       }
//     }, () => {
//       callback(teams);
//     });
//   });
// }

// function renderTeams(teams) {
//   // Loop through teams and create elements for each one
//   for (let i = 0; i < teams.length; i++) {
//     const team = teams[i];
//     const teamElement = document.createElement('div');
//     teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
//     teamElement.innerHTML = `
//       <div class="dynprog-crd dynprog-hover-shadow">
//         <div class="dynprog-container dynprog-center">
//           <h4><b>${team.name}</b></h4> 
//           <p>${team.sport}</p> 
//           <p class="team-info" style="display: none;">Players: ${team.num_players}, Wins: ${team.W}, Losses: ${team.L}</p>
//         </div>
//       </div>
//     `;
//     teamList.appendChild(teamElement);

//     // Add event listener to show/hide team info on hover
//     teamElement.addEventListener('mouseenter', () => {
//       const teamInfo = teamElement.querySelector('.team-info');
//       teamInfo.style.display = 'block';
//     });

//     teamElement.addEventListener('mouseleave', () => {
//       const teamInfo = teamElement.querySelector('.team-info');
//       teamInfo.style.display = 'none';
//     });
//   }
// }

// fetchTeams(renderTeams);

//This should make it so the boxes don't jumble and get moved around when hoverd over
function expandBox(teamElement) {
    const card = teamElement.querySelector('.dynprog-crd');
    card.style.height = "200px";
  }
  
  function collapseBox(teamElement) {
    const card = teamElement.querySelector('.dynprog-crd');
    card.style.height = "100px";
  }

//Loop through teams and create elements for each one
for (let i = 0; i < teams.length; i++) {
  const team = teams[i];
  const teamElement = document.createElement('div');
  teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
  teamElement.innerHTML = `
    <div class="dynprog-crd dynprog-hover-shadow">
      <div class="dynprog-container dynprog-center">
        <h4><b>${team.name}</b></h4> 
        <p>${team.sport}</p> 
        <p class="team-info" style="display: none;">Players: ${team.num_players}, Wins: ${team.W}, Losses: ${team.L}</p>
      </div>
    </div>
  `;
  teamList.appendChild(teamElement);

  // Add event listener to show/hide team info on hover
  teamElement.addEventListener('mouseenter', () => {
    const teamInfo = teamElement.querySelector('.team-info');
    teamInfo.style.display = 'block';
  });

  teamElement.addEventListener('mouseleave', () => {
    const teamInfo = teamElement.querySelector('.team-info');
    teamInfo.style.display = 'none';
  });
}
  


// Added by Logan
//COOKIE INFO
 let userCookieId;

 let getSessionId = function (callback) {
   const cookies = document.cookie.split(';');
   const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
   userCookieId = cookie ? cookie.split('=')[1] : null;
   console.log(userCookieId);

   const sessionId = {
     id: userCookieId
   }

   const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;

   callback(userURL);
}

// let getUserData = function (url,callback) {
//   console.log(url);
//   fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     if (response.ok) {
//       response.json().then(data => {
//         setUserData(data, () => {
//           console.log("User Data Set");
//           const teamURL = 'http://127.0.0.1:5000/teams/' + data.teamID;
//             if(data.teamID !== null) 
//             {
//               getTeamData(teamURL, () => {
//                 callback();
//               });
//             }
//             else
//             {
//               callback();
//             }
//         });
//       });
//     } 
//     else {
//       console.error('Error: ' + response.statusText);
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }

// let getTeamData = function (teamURL, callback) {
//   fetch(teamURL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//   }
//   })
//   .then(response => {
//     if (response.ok) {
//       response.json().then(data => {
//         setTeamData(data, () => {
//           console.log("Team Data Set");
//           const leagueURL = 'http://127.0.0.1:5000/leagues/' + data.p_id;
//           getLeagueData(leagueURL, () => {
//             callback();
//           });
//         });
//       });
//     } 
//     else {
//       console.error('Error: ' + response.statusText);
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }

// let getLeagueData = function (leagueURL, callback) {
//   fetch(leagueURL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//   }
//   })
//   .then(response => {
//     if (response.ok) {
//       response.json().then(data => {
//         setLeagueData(data, () => {
//           console.log("League Data Set");
//           callback();
//         });
//       });
//     } 
//     else {
//       console.error('Error: ' + response.statusText);
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }

// let loadData = function () {
//   getSessionId((userURL) => {
//     console.log("URL: " + userURL);
//     getUserData(userURL,() => {
//       console.log("All Data Set");
//       //FOR JULIANA: ADD CODE OR FUNCTION HERE TO DELETE LOADING ELEMENT
//     });
//   });
// };


// const welcomeButton = document.querySelector("#welcome-button");

// // Get a reference to the <h4> element for each object
// let fullNameHeading = document.getElementById("full_name");
// let userNameHeading = document.getElementById("username");
// let email = document.getElementById("email");
// let position = document.getElementById("position");
// let bio = document.getElementById("bio");
// let username = null;
// let first = null;
// let last = null;

// let setUserData = function (userDataJSON,callback) {
//   console.log(userDataJSON.username);
//   //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
//   if(userDataJSON.username){
//     username = userDataJSON.username;
//     welcomeButton.textContent = "Welcome, " + username + "!!!";
//     userNameHeading.textContent = "Username: " + username;
//   };
  
//   //NEED TO FIX FOR WHERE FIRST OR LAST IS NULL!
//   if(userDataJSON.firstName && userDataJSON.lastName){
//     first = userDataJSON.firstName;
//     last = userDataJSON.lastName;
//     fullNameHeading.textContent = "Name: " + first + " " + last;
//   } else if(userDataJSON.firstName && userDataJSON.lastName === null){
//       first = userDataJSON.firstName;
//       fullNameHeading.textContent = "Name: " + first;
//   }else if(userDataJSON.firstName = null && userDataJSON.lastName){
//       last = userDataJSON.lastName;
//       fullNameHeading.textContent = "Name: " + last;
//   };

//   if(userDataJSON.email){
//     email.textContent = "Email: " + userDataJSON.email;
//   };

//   if(userDataJSON.pos){
//     position.textContent = "My Position: " + userDataJSON.pos;
//   };

//   if(userDataJSON.bio){
//     bio.textContent = "Bio: " + userDataJSON.bio;
//   }
//   callback();
// }

// let setTeamData = function (teamDataJSON, callback) {
//   console.log(teamDataJSON.name);
//   //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH TEAM DATA (USE THE 'teamDataJSON' OBJECT)
//   callback();
// }

// let setLeagueData = function (leagueDataJSON, callback) {
//   console.log(leagueDataJSON.name);
//   //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH LEAGUE DATA (USE THE 'leagueDataJSON' OBJECT)
//   callback();
// }

// loadData();


// var sqlite = require('sqlite3').verbose();
// const { get_path } = require('../controllers/global_teams.js');
// var db_path;
// let teamNames = [];
// function ExtractTeams(db, callback){
//   db.all('SELECT * FROM Teams ORDER by ID', [], (err, rows)=>{
//     if(err){
//       return console.error(err.message);
//     }
//     else
//     {           
//       rows.forEach((row)=>{
//           teamNames.push(row.name);
//        });
      
//       return callback(false, teamNames);
        
//     }
//   });
// }

// var db = new sqlite3.Database(get_path(db_path), (err) => {
//   if(err){
//     return console.error(err.message);
//   }
//   console.log('Connected');
// })

// ExtractTeams(dtb, function(err, content){
//   if(err) throw(err);
//   extractedTeams = content;
//   console.log("Teams", extractedTeams);
// })

getSessionId(() => { //TAKE THIS OUT AND REPLACE WITH A LOAD DATA FUNCTION
  console.log("Got Session ID");
});  

//Logout
let logout = function(callback) {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    console.log(cookie)
    if (cookie.trim().startsWith("UserCookie")) {
      // Set the cookie's expiration date to a past date to delete it
      document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log(document.cookie)
    }
  });

  const deleteSessionURL = 'http://127.0.0.1:5000/users/delete_session/' + userCookieId;

  fetch(deleteSessionURL, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      console.log("Session Deleted");
      callback();
    } 
    else {
      console.error('Error: ' + response.statusText);
      callback();
    }
  })
  .catch(error => {
    console.error(error);
  });
}

document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}