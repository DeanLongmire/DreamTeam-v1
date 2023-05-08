let teamId;

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
        console.log(data.usernames);
        console.log(data.positions);
        console.log(data.ids);
        console.log(data.TDs);
        console.log(data.catches);
        console.log(data.tackles);
        console.log(data.goals);
        console.log(data.saves);
        console.log(data.hits);
        console.log(data.RBIs);
        console.log(data.errors);
        callback();
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
        teamId = data.id;
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
      console.log("All Data Set");
      const getPlayersURL = 'http://127.0.0.1:5000/players/get_players_on_team/' + teamId;
      getPlayers(getPlayersURL,() => {
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