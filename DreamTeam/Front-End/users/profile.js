let userCookieId;
const welcomeButton = document.querySelector("#welcome-button");
// Get a reference to the <h4> element for each object
let fullNameHeading = document.getElementById("full_name");
let userNameHeading = document.getElementById("username");
let email = document.getElementById("email");
let position = document.getElementById("position");
let bio = document.getElementById("bio");
let username = null;
let first = null;
let last = null;
let leagueHeading = document.getElementById("league");
let leaguename = null;
let barLeague = document.getElementById("league_bt");
let teamHeading = document.getElementById("team");
let teamname = null;
let barTeam = document.getElementById("team_bt");


//COOKIE INFO
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
              teamHeading.onclick = function(){
                window.location.href = "../teams/view_teams.html";
              }
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
      //FOR JULIANA: ADD CODE OR FUNCTION HERE TO DELETE LOADING ELEMENT
    });
  });
};


let setUserData = function (userDataJSON,callback) {
  console.log(userDataJSON.username);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
  if(userDataJSON.username){
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!";
    userNameHeading.textContent = "Username: " + username;
  };
    
  if(userDataJSON.firstName && userDataJSON.lastName){
    first = userDataJSON.firstName;
    last = userDataJSON.lastName;
    fullNameHeading.textContent = "Name: " + first + " " + last;
  }
  else if(userDataJSON.firstName){
    first = userDataJSON.firstName;
    fullNameHeading.textContent = "Name: " + first;
  }
  else if(userDataJSON.lastName){
    last = userDataJSON.lastName;
    fullNameHeading.textContent = "Name: " + last;
  }
  else{
    fullNameHeading.textContent = "Name: N/A";
  };

  if(userDataJSON.email){
    email.textContent = "Email: " + userDataJSON.email;
  };

  if(userDataJSON.pos){
    position.textContent = "My Position: " + userDataJSON.pos;
  };

  if(userDataJSON.bio){
    bio.textContent = "Bio: " + userDataJSON.bio;
  }

  if(userDataJSON.pp){
    const profilePhoto = document.querySelector("img");
    profilePhoto.src = "data:image/jpeg;base64," + userDataJSON.pp;
  }
  callback();
}

let setTeamData = function (teamDataJSON, callback) {
  console.log("In set team data");
  console.log(barTeam.textContent);
  console.log(teamHeading.textContent);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH TEAM DATA (USE THE 'teamDataJSON' OBJECT)
  if(teamDataJSON != null){
    teamname = teamDataJSON.name;
    teamHeading.textContent = "View " + teamname + " Home Page";
  
    teamHeading.onclick = function(){
      window.location.href = "../teams/team_home.html";
    }
    
  }
  else{
    teamHeading.textContent = "Must be in league to join a team"
  }

  callback();
}


let setLeagueData = function (leagueDataJSON, callback) {
  console.log("In set league data");
  console.log(barLeague.texContent);
  console.log(leagueHeading.textContent);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH LEAGUE DATA (USE THE 'leagueDataJSON' OBJECT)
  if(leagueDataJSON != null){
    leaguename = leagueDataJSON.name;
    leagueHeading.textContent = "View " + leaguename + " Home Page";
    
    leagueHeading.onclick = function(){
      window.location.href = "../leagues/league_home.html";
    }

    barLeague.textContent = "View my league";
    barLeague.onclick = function(){
      window.location.href = "../leagues/league_home.html";
    }
  }
  else{
    console.log("NO LEAGUE NAME EXISTS");
    leagueHeading.textContent = "No league found: Please join one or create on here"
    leagueHeading.onclick = function(){
      window.location.href = "../leagues/join_league.html";
    }
    barLeague.textContent = "Join a League"
    barLeague.onclick = function(){
      window.location.href = "../leagues/join_league.html";
    }
  }

  callback();
}

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

loadData();

//need to send this userCookieId to the client side, get the user's data, send it back to this page, and then display it appropriatly
//Also need to probably halt the page from loading all its elements while this happens

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
    logout(() => {
      window.location.replace("../home/index.html");
    });
}

//Function for the acordian!
function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("dynprog-show") == -1) {
      x.className += " dynprog-show";
    } else { 
      x.className = x.className.replace(" dynprog-show", "");
    }
  }
