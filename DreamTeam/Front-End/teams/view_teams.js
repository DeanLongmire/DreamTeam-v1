//const teamList = document.getElementById('team-container');
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

//This should make it so the boxes don't jumble and get moved around when hoverd over
function expandBox(teamElement) {
  const card = teamElement.querySelector('.dynprog-crd');
  card.style.height = "200px";
}
  
function collapseBox(teamElement) {
  const card = teamElement.querySelector('.dynprog-crd');
  card.style.height = "100px";
}

const welcomeButton = document.querySelector("#welcome-button");
//Reference for username
let userNameHeading = document.getElementById("username");
let username = null;

//Loop through teams and create elements for each one
// for (let i = 0; i < teams.length; i++) {
//   const team = teams[i];
//   const teamElement = document.createElement('div');
//   teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
//   teamElement.innerHTML = `
//     <div class="dynprog-crd dynprog-hover-shadow">
//       <div class="dynprog-container dynprog-center">
//         <h4><b>${team.name}</b></h4> 
//         <p>${team.sport}</p> 
//         <p class="team-info" style="display: none;">Players: ${team.num_players}, Wins: ${team.W}, Losses: ${team.L}</p>
//       </div>
//     </div>
//   `;
//   teamList.appendChild(teamElement);

//   // Add event listener to show/hide team info on hover
//   teamElement.addEventListener('mouseenter', () => {
//     const teamInfo = teamElement.querySelector('.team-info');
//     teamInfo.style.display = 'block';
//   });

//   teamElement.addEventListener('mouseleave', () => {
//     const teamInfo = teamElement.querySelector('.team-info');
//     teamInfo.style.display = 'none';
//   });
// }

//GLOBALS
let userCookieId;
let leagueId;

///COOKIE INFO
let getSessionId = function (callback) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
  userCookieId = cookie ? cookie.split('=')[1] : null;
  
  const sessionId = {
    id: userCookieId
  }
  
  const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;
  
  callback(userURL);
}

let getUserData = function (url,callback) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        setUserData(data, () => {
          console.log("User Data Set");
          callback();
        });
      });
    } 
    else 
    {
      console.error('Error: ' + response.statusText);
      callback();
    }
  })
  .catch(error => {
    console.error(error);
  });
}

let getAllTeams = function(url,callback) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        callback(data);
      });
    } 
    else 
    {
      console.error('Error: ' + response.statusText);
      callback();
    }
  })
  .catch(error => {
    console.error(error);
  });
}

let loadData = function () {
  getSessionId((userURL) => {
    getUserData(userURL,() => {
      console.log("All Data Set");
      getAllURL = "http://127.0.0.1:5000/teams/get_team_in_league/" + leagueId;
      getAllTeams(getAllURL,() => {
        //fill in html with teams here, use set team data
      });
    });
  });
};

//Setting the username
let setUserData = function (userDataJSON,callback) {
    if(userDataJSON.username){
      username = userDataJSON.username;
      welcomeButton.textContent = "Welcome, " + username + "!";
    };
    leagueId = userDataJSON.leagueID;
    callback();
}

let logout = function(callback) {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    console.log(cookie)
    if (cookie.trim().startsWith("UserCookie")) {
      console.log("Test");
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

/*let setTeamData = function(teamDataJSON, callback){
    const teamContainer = document.getElementById("team-container");
    //const lContainer = document.getElementById("l_container");
    names = teamDataJSON.name;
    sports = teamDataJSON.sport;
    nPlayers = teamDataJSON.num_players;
    wins = teamDataJSON.W;
    losses = teamDataJSON.L;
    for (let i = 0; i < names.length; i++) {
      const teamName = names[i];
      const teamSport = sports[i];
      const pCount = nPlayers[i];
      const win = wins[i];
      const loss = losses[i];
      const h4 = document.createElement("h4");
      h4.textContent = teamName + " " + teamSport + " " + pCount + " " + win + " " + loss;
      teamContainer.appendChild(h4);
    }
    callback();
  }*/

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}

loadData();