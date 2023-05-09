//Essentially the same js as create league but this is for create team
//const url = 'https://localhost:5000/teams';
/*const url = 'http://localhost:5000/teams';

let create_button = document.getElementById("create_team_button");

//How the data is able to be receieved that the user selects, inputs
let saveTeam = () => {
    //Get data from each element
    const numPlayerRadios = document.getElementsByName("num_players");
    let selectedSize;

    for (const size of numPlayerRadios) {
      if (size.checked) {
      selectedSize = size.value;
      break;
      }
    }

    //console.log(selectedSize);

    const teamInput = document.getElementById("team_input");
    const teamName = teamInput.value;
    
    //console.log(teamName);

    const data = { 
      size: selectedSize, 
      teamName: teamName 
    };

    console.log(data);

    //This is the fetch and catch stuff to send it back to the server
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response.body);
      console.log(response.type);
      if (response.ok) {
        console.log("Check");
        window.location.replace('view_teams.html');
      } else {
        console.log("Error");
        throw new Error('Unable to create user account');
      }
    })
    .catch(error => {
      console.error(error);
      console.log("Catch block executed");
    });
}

create_button.addEventListener("click", saveTeam);
*/

let globalUID;
let globalUPOS;
let globalUUN;
let parentLeagueID;
let leagueSport;
const welcomeButton = document.querySelector("#welcome-button");
let userNameHeading = document.getElementById("username");
let username = null;

const setUserData = function(userDataJSON, callback) {
  console.log(userDataJSON.username);
  if(userDataJSON.username){
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!";
  };
  callback();
}

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
        globalUID = data.id;
        globalUPOS = data.pos;
        globalUUN = data.username;
        console.log(globalUID);
        setUserData(data, () => {
          console.log("User Data Set");
          const teamURL = 'http://127.0.0.1:5000/teams/' + data.teamID;
            if(data.teamID !== null) //this shouldn't happen, ideally they cannot create a team if they are already on one
            {
              getTeamData(teamURL, () => {
                callback();
              });
            }
            else if(data.teamID === null && data.leagueID == null) //gotta get league ID of league they are attempting to create a team in, probably from a cookie when they click on a league
            {  
              callback();
            }
            else //they are in a league already, get the leagueID from the user
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
        leagueSport = data.sport;
        parentLeagueID = data.ID;
        console.log(leagueSport + " " + parentLeagueID);
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

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      console.log("All Data Set");
    });
  });
};

loadData();


const url = 'http://localhost:5000/teams'

//Make the fields and create button
const create_button = document.querySelector('#create_team_button');
const teamInput = document.getElementById("team_input");
let selectedSize = null; //Define outside the function

//Disable the button in the beginning
create_button.disabled = true;

//Add event listener for team name field
teamInput.addEventListener("input", toggleCreateButton)

//Controls the functionality of the create button
function toggleCreateButton(){
  //get data from each element
  const numPlayerRadios = document.getElementsByName("num_players");

  //Checking the amount of players checked
  for (const num_players of numPlayerRadios){
    if(num_players.checked){
      selectedSize = num_players.value; //Setting value of selected size
      break;
    }
  }

  //How to disable/enable the create button so user forced to put input
  if(teamInput.value.trim !== ''){
    create_button.disabled = false;
  }
  else{
    create_button.disabled = true;
  }
}

const setUserTeamId = function(url,data,callback) {
  fetch(url, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 })
 .then(response => {
    if (response.ok) {
      callback();
    } else {
      // Handle error response
      throw new Error('Unable to create user account');
      window.location.replace('../error.html');
    }
  })
 .catch(error => console.error(error));
}

const createPlayer = function(url,data,callback) {
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 })
 .then(response => {
    if (response.ok) {
      console.log("Player Created")
      callback();
    } else {
      // Handle error response
      throw new Error('Unable to create user account');
      window.location.replace('../error.html');
    }
  })
 .catch(error => console.error(error));
}

//Function to create a team on click
//Function to create a league on click
function createTeam(){
  const teamName = teamInput.value; //Set leaguename
  const data = { 
      size: selectedSize, 
      teamName: teamName,
      creator: globalUID,
      P_ID: parentLeagueID,
      sport: leagueSport
    };
    
    console.log(data);

    //How data is sent back to database
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(response => {
        if (response.ok) {
          response.json().then(teamData => {
            const updateURL = 'http://127.0.0.1:5000/users/update_team/' + globalUID;
            setUserTeamId(updateURL,teamData,() => {
              console.log("Done");
              const globalUserData = {
                userId: globalUID,
                teamId: teamData.teamId,
                pos: globalUPOS,
                username: globalUUN
              }
              const playerURL = 'http://127.0.0.1:5000/players';
              createPlayer(playerURL,globalUserData,() => {
                console.log("DONE");
                window.location.replace('team_admin.html');
              });
            })
          });
        } else {
          // Handle error response
          throw new Error('Unable to create user account');
          window.location.replace('../error.html');
        }
      })
     .catch(error => console.error(error));
}

//Event listener for when user clicks the button
create_button.addEventListener('click', () =>{
  createTeam();
});

//Logout functionality on the create team page
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

loadData();

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}