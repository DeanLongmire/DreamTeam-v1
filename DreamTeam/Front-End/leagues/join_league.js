// Array of league names
const leagues = ["League A", "League B", "League C"];

const ls =[
    {name: 'League 1', team: 1.99},
    {name: 'League 2', team: 2.99},
    {name: 'League 3', team: 3.99}
];

// Get the container element where the league names will be displayed
const leagueContainer = document.getElementById("league_container");
const lContainer = document.getElementById("l_container");

// Loop through the array of league names and create a new h4 element for each one
for (let i = 0; i < leagues.length; i++) {
    const leagueName = leagues[i];
    const h4 = document.createElement("h4");
    h4.textContent = leagueName;
    leagueContainer.appendChild(h4);
}

for (const l of ls) {
    const div = document.createElement('div');
    div.classList.add('.dynprog-card-4');
    div.innerHTML = `<h3>${l.name}</h3><p>$${l.team.toFixed(2)}</p>`;
    //container.appendChild(div);
  }


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
            const teamURL = 'http://127.0.0.1:5000/teams/' + data.teamID;
              if(data.teamID !== null) 
              {
                getTeamData(teamURL, () => {
                  callback();
                });
              }
              else
              {
                callback();
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

  //Reference for username
let userNameHeading = document.getElementById("username");
let username = null;

let setUserData = function (userDataJSON,callback) {
    console.log(userDataJSON.username);
    //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
    if(userDataJSON.username){
      username = userDataJSON.username;
      welcomeButton.textContent = "Welcome, " + username + "!!!";
    };
    callback();
}

//Need to add team and league after get it working on profile

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
    alert("You have been logged out");
}