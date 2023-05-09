//JS Page for League Home
//Will have to make dynamic boxes to account for different numbers of teams
let adminButton = document.getElementById("league_owner");
let leagueAdmin;
let userId;

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
        setTeamData(data, () => {
          console.log("Team Data Set");
          const leagueURL = 'http://127.0.0.1:5000/leagues/' + data.p_id;
          getLeagueData(leagueURL, () => {
            callback();
          });
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
        setLeagueData(data, () => {
          console.log("League Data Set");
          leagueAdmin = data.adminId;
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

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      console.log("All Data Set");
      if(leagueAdmin == userId)
      {
        console.log("Admin Logged In");
        adminButton.textContent = "Edit my league's information"
        adminButton.onclick = function(){
          window.location.href = "league_admin.html";
        }
      }
      else
      {
        adminButton.style.display = "none";
        console.log("You are not an admin")
      }
    });
  });
};
const welcomeButton = document.querySelector("#welcome-button");

//Reference for username
let userNameHeading = document.getElementById("username");
let username = null;
let leagueHeading = document.getElementById("league");
let leaguename = null;
let userTeamHeading = document.getElementById("team");
let userteam = null;
let sportHeading = document.getElementById("sport_type");
let sport_type = null;

//Setting the username
let setUserData = function (userDataJSON,callback) {
  console.log(userDataJSON.username);
  if(userDataJSON.username){
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!";
  };
  callback();
}

let setLeagueData = function (leagueDataJSON,callback){
  console.log(leagueDataJSON.name);
  console.log(leagueDataJSON.sport);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH LEAGUE DATA (USE THE 'leagueDataJSON' OBJECT)
  if(leagueDataJSON.name){
    leaguename = leagueDataJSON.name;
    leagueHeading.textContent = leaguename;
    sport_type = leagueDataJSON.sport;
    if(sport_type === "Flag_football"){
      sportHeading.textContent = "Sport: Flag Football"
    }
    else if(sport_type === "Men_soccer"){
      sportHeading.textContent = "Sport: Men's Soccer"
    }
    else{
      sportHeading.textContent = "Sport: " + sport_type;
    }
  }
  if(leagueDataJSON.pp)
  {
    const league_photo = document.getElementById("league_photo");
    league_photo.src = "data:image/jpeg;base64," + leagueDataJSON.pp;
  }
   
 
  callback();
}

let setTeamData = function (teamDataJSON,callback){
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

//Need to add team and league after get it working on profile
loadData();

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}