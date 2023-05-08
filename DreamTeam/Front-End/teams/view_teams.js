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
let teamID;
let UserId;
let UserUsername;
let UserPosition;

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
          teamID = data.teamID;
          UserId = data.id;
          UserUsername = data.username;
          UserPosition = data.pos;
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
      getAllTeams(getAllURL,(data) => {
        setTeamData(data, ()=>{});
        console.log(data);
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

let update_user_team = function(url,dataJSON,callback) {
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataJSON)
  })
  .then(response => {
    if (response.ok) {
      callback();
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

let create_player = function(url,dataJSON,callback) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataJSON)
  })
  .then(response => {
    if (response.ok) {
      callback();
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

let setTeamData = function(teamDataJSON, callback){
  const tableBody = document.querySelector('#team-table tbody');
  const teamInModal = document.getElementById("team_in_modal");
  const enrollPlayer = document.getElementById("confirm_enrollment");
  const joinText = document.getElementById("join_pls");
  const createTeam = document.getElementById("create_team_box");
  // Get the modal
  var modal = document.getElementById("modal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  names = teamDataJSON.names;
  wins = teamDataJSON.wins;
  losses = teamDataJSON.losses;
  ids = teamDataJSON.ids;

  for(let i = 0; i < names.length; i++){
    const teamname = names[i];
    const winScore = wins[i];
    const lossScore = losses[i];
    const tableIds = ids[i];
    console.log(teamname);

    const row = document.createElement('tr');
    const nameCol = document.createElement('td');
    const recordCol = document.createElement('td');
    const join = document.createElement('td');
    const join_bt = document.createElement('button');
    nameCol.textContent = teamname;
    recordCol.textContent = "(" + winScore + "-" + lossScore + ")";
    join_bt.textContent = "Join this team";
    join_bt.classList.add("dynprog-button");
    console.log(teamID);
    if(teamID != null){
      join_bt.style.display = "none";
      joinText.textContent = "";
      createTeam.style.display = "none";
    }
    join_bt.addEventListener("click", function(){
        modal.style.display = "block";
        teamInModal.textContent = teamname;
        enrollPlayer.addEventListener("click", function(){
            const tUrl = 'http://127.0.0.1:5000/users/update_team/' + UserId;
            const pUrl = 'http://127.0.0.1:5000/players';
            const teamData = {
              teamId: tableIds
            }
            console.log(teamID);
            const playerData = {
              username: UserUsername,
              teamId: tableIds,
              pos: UserPosition,
              userId: UserId
            }
            update_user_team(tUrl,teamData,() => {
              create_player(pUrl,playerData,() => {
                window.location.replace("team_home.html");
              })
            })
        });
        console.log("button clicked");
      });

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
             modal.style.display = "none";
          }
        }

      //but.style.marginBottom = "10px";
      join.appendChild(join_bt);
      row.appendChild(nameCol);
      row.appendChild(recordCol);
      row.appendChild(join);
      tableBody.appendChild(row);

    }
    callback();
  }

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}

loadData();