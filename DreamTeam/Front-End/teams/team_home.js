let teamId;
let league_sport;
let team_admin;
let adminButton = document.getElementById("team_owner");
let userId;
let teamHeading = document.getElementById("teams");
//COOKIE INFO
let getSessionId = function (callback) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
  const userCookieId = cookie ? cookie.split('=')[1] : null;
  console.log(userCookieId);

  const sessionId = {
    id: userCookieId
  }

  const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;

  callback(userURL);
}

//Reference for username
let userNameHeading = document.getElementById("username");
const welcomeButton = document.querySelector("#welcome-button");
let username = null;

//Setting the username
let setUserData = function (userDataJSON,callback) {
  console.log(userDataJSON.username);
  if(userDataJSON.username){
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!";
  };
  callback();
}

//Logout
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

let getPlayers = function(url,callback) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(response.status === 200) { //we got players
      response.json().then(data => {
        callback(data);
      })
    }
    else if(response.status === 201) { //no players on team
      console.log("No Players On Team");
      callback();
    }
  })
  .catch(error => {
    console.error(error);
    callback();
  })
}

let createPlayerCookie = function(id,callback)
{
  document.cookie = "PlayerCookie=" + id;
  callback();
}

//display player data to table
let setPlayerData = function (playerDataJSON, callback){
 const tableBody = document.querySelector('#player-table tbody');
 const updateStats = document.getElementById("edit-stats");
 const stat1 = document.getElementById("stat-1");
 const stat2 = document.getElementById("stat-2");
 const stat3 = document.getElementById("stat-3");


 names = playerDataJSON.usernames;
 positions = playerDataJSON.positions;
 ids = playerDataJSON.ids;
 TDs = playerDataJSON.TDs;
 catches = playerDataJSON.catches;
 tackles = playerDataJSON.tackles;
 goals = playerDataJSON.goals;
 saves = playerDataJSON.saves;
 hits = playerDataJSON.hits;
 RBIs = playerDataJSON.RBIs;
 errors = playerDataJSON.errors;


 for(let i = 0; i<names.length; i++){
  const playerName = names[i];
  const playerPostions = positions[i];
  const tableIds = ids[i];
  const playerTDs = TDs[i];
  const playerCatches = catches[i];
  const playerTackles = tackles[i];
  const playerGoals = goals[i];
  const playerSaves = saves[i];
  const playerHits = hits[i];
  const playerRBIs = RBIs[i];
  const playerErrors = errors[i];
  console.log(playerName);
  console.log("this is team_admin" +team_admin);
  const row = document.createElement('tr');
  const nameCol = document.createElement('td');
  const posCol = document.createElement('td');
  const stat1col = document.createElement('td');
  const stat2col = document.createElement('td');
  const stat3col = document.createElement('td');
  const editCol = document.createElement('td');
  const edit_bt = document.createElement('button');
  nameCol.textContent = playerName;
  posCol.textContent = playerPostions;
  updateStats.textContent = "Edit Stats";
//check for sport:
if(league_sport === "Flag_football"){
  stat1.textContent = "Touchdowns";
  stat2.textContent = "Catches";
  stat3.textContent = "Tackles";
  stat1col.textContent = playerTDs;
  stat2col.textContent = playerCatches;
  stat3col.textContent = playerTackles;
}
else if(league_sport === "Men_soccer"){
  stat1.textContent = "Goals";
  stat2.textContent = "Saves";
  stat1col.textContent = playerGoals;
  stat2col.textContent = playerSaves;
  stat3col.textContent = "";
}
else{
  stat1.textContent = "Hits";
  stat2.textContent = "RBIs";
  stat3.textContent = "Errors";
  stat1col.textContent = playerHits;
  stat2col.textContent = playerRBIs;
  stat3col.textContent = playerErrors;
}

edit_bt.textContent = "Edit Player's Stats";
edit_bt.classList.add("dynprog-button");

if(team_admin != userId){
  edit_bt.style.display = "none";
  updateStats.textContent = "";
}

  edit_bt.addEventListener("click", function(){
    if(league_sport === "Flag_football"){
      createPlayerCookie(tableIds,() => {
        window.location.replace("edit_fb_stats.html");
      })
    }
    else if(league_sport === "Men_soccer"){
      createPlayerCookie(tableIds,() => {
        window.location.replace("edit_sc_stats.html");
      })
    }else{
      createPlayerCookie(tableIds,() => {
        window.location.replace("edit_sb_stats.html");
      })
    }
  });

  editCol.appendChild(edit_bt);
  row.appendChild(nameCol);
  row.appendChild(posCol);
  row.appendChild(stat1col);
  row.appendChild(stat2col);
  row.appendChild(stat3col);
  row.appendChild(editCol);
  tableBody.appendChild(row);
 }
 callback();
}






let getUserData = function (url,callback) {
  console.log(url);
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
          userId = data.id;
          const teamURL = 'http://127.0.0.1:5000/teams/' + data.teamID;
            if(data.teamID !== null) 
            {
              getTeamData(teamURL, () => {
                callback();
              });
            }
            else if(data.teamID === null && data.leagueID == null)
            {
              let leagueNull;
              let teamNull; 
              setLeagueData(leagueNull, ()=> {
                callback();
              });
              setTeamData(teamNull, ()=> {
                callback();
              });
                
              callback();
            }
            else
            {
              const leagueURL = 'http://127.0.0.1:5000/leagues/' + data.leagueID;
              getLeagueData(leagueURL, () => {
                
                callback();
              });
            }
        });
      });
    } 
    else {
      console.error('Error: ' + response.statusText);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

let getTeamData = function (teamURL, callback) {
  fetch(teamURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        console.log("this is the name " + data.name);
        teamHeading.textContent = data.name;
        teamId = data.id;
        team_admin = data.a_id; 
        const leagueURL = 'http://127.0.0.1:5000/leagues/' + data.p_id;
        getLeagueData(leagueURL, () => {
          callback();
        });
      });
    } 
    else {
      console.error('Error: ' + response.statusText);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

let getLeagueData = function (leagueURL, callback) {
  fetch(leagueURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        league_sport = data.sport;
        console.log("this the sport: " + data.sport);
        callback();
      });
    } 
    else {
      console.error('Error: ' + response.statusText);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

//load data from league_home...
let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      if(team_admin == userId){
        console.log("Admin Logged In");
        adminButton.textContent = "Edit my Team's information"
        adminButton.onclick = function(){
          window.location.href = "team_admin.html";
        }
      }
      else{
        adminButton.style.display = "none";
      }
      console.log("All Data Set");
      const getPlayersURL = 'http://127.0.0.1:5000/players/get_players_on_team/' + teamId;
      getPlayers(getPlayersURL,(data) => {
        setPlayerData(data,()=>{});
        console.log("Got Players");
      })
    });
  });
};

loadData();
  
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}