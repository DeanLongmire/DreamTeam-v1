const teamList = document.getElementById('team-container');

const teams = [
  { name: 'Team A', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team B', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team C', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team D', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team E', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team F', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team G', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team H', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team I', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  { name: 'Team J', sport: 'Flag Football', players: 10, wins: 5, losses: 2 },
  { name: 'Team K', sport: 'Men\'s Soccer', players: 11, wins: 7, losses: 3 },
  { name: 'Team L', sport: 'Softball', players: 9, wins: 3, losses: 4 },
  // add more teams here
];

//This should make it so the boxes don't jumble and get moved around when hoverd over
function expandBox(teamElement) {
    const card = teamElement.querySelector('.dynprog-crd');
    card.style.height = "200px";
  }
  
  function collapseBox(teamElement) {
    const card = teamElement.querySelector('.dynprog-crd');
    card.style.height = "100px";
  }

// Loop through teams and create elements for each one
for (let i = 0; i < teams.length; i++) {
  const team = teams[i];
  const teamElement = document.createElement('div');
  teamElement.className = 'dynprog-col dynprog-third dynprog-margin-bottom';
  teamElement.innerHTML = `
    <div class="dynprog-crd dynprog-hover-shadow">
      <div class="dynprog-container dynprog-center">
        <h4><b>${team.name}</b></h4> 
        <p>${team.sport}</p> 
        <p class="team-info" style="display: none;">Players: ${team.players}, Wins: ${team.wins}, Losses: ${team.losses}</p>
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

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      console.log("All Data Set");
      //FOR JULIANA: ADD CODE OR FUNCTION HERE TO DELETE LOADING ELEMENT
    });
  });
};


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

let setUserData = function (userDataJSON,callback) {
  console.log(userDataJSON.username);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
  if(userDataJSON.username){
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!!!";
    userNameHeading.textContent = "Username: " + username;
  };
  
  //NEED TO FIX FOR WHERE FIRST OR LAST IS NULL!
  if(userDataJSON.firstName && userDataJSON.lastName){
    first = userDataJSON.firstName;
    last = userDataJSON.lastName;
    fullNameHeading.textContent = "Name: " + first + " " + last;
  } else if(userDataJSON.firstName && userDataJSON.lastName === null){
      first = userDataJSON.firstName;
      fullNameHeading.textContent = "Name: " + first;
  }else if(userDataJSON.firstName = null && userDataJSON.lastName){
      last = userDataJSON.lastName;
      fullNameHeading.textContent = "Name: " + last;
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
  callback();
}

let setTeamData = function (teamDataJSON, callback) {
  console.log(teamDataJSON.name);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH TEAM DATA (USE THE 'teamDataJSON' OBJECT)
  callback();
}

let setLeagueData = function (leagueDataJSON, callback) {
  console.log(leagueDataJSON.name);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH LEAGUE DATA (USE THE 'leagueDataJSON' OBJECT)
  callback();
}

loadData();