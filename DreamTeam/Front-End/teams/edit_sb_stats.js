//GLOBALS
let teamID;
let leagueID;
let editPlayerID;
let userCookieId;

//Set HTML objects
const welcomeButton = document.querySelector("#welcome-button");
const update_player_BT = document.getElementById("update_stats_button");
let playerName = document.getElementById("player_name");
let hits = document.getElementById("hits");
let RBIs = document.getElementById("rbis");
let errors = document.getElementById("errors");

//get sessionId from cookie
let getSessionId = function(callback) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
    userCookieId = cookie ? cookie.split('=')[1] : null;
  
    const sessionId = {
      id: userCookieId
    }
  
    const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;
  
    callback(userURL);
}

let getPlayerCookie = function(callback) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith('PlayerCookie'));
    editPlayerID = cookie ? cookie.split('=')[1] : null;

    callback();
}

//get userData
let getUserData = function (url,callback) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if(response.ok) 
        {
            response.json().then(data => {
                teamID = data.teamID;
                setUserData(data,() => {
                    callback();
                })
            })
        }
        else
        {

        }
    })
    .catch(error => {
      console.error(error);
    });
}

//get teamData
let getTeamData = function (teamURL, callback) {
    fetch(teamURL, {
        method: 'GET',
         headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) 
        {
            response.json().then(data => {
                leagueID = data.p_id;
                callback();
            });
        } 
        else 
        {
            console.error('Error: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

//get leagueData
let getLeagueData = function (leagueURL, callback) {
    fetch(leagueURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) 
        {
            response.json().then(data => {
                callback();
            });
        } 
        else 
        {
            console.error('Error: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

let getPlayerData = function(url,callback) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) 
        {
            response.json().then(data => {
                setPlayerData(data,() => {
                    callback();
                })
            });
        } 
        else 
        {
            console.error('Error: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

let setUserData = function(userDataJSON,callback) {
    welcomeButton.textContent = "Welcome, " + userDataJSON.username + "!";
    callback();
}

let setPlayerData = function(playerDataJSON,callback) {
    playerName.textContent = playerDataJSON.username + "'s";
    callback();
}

let loadData = function() {
    getPlayerCookie(() => {console.log(editPlayerID);})
    getSessionId((userURL) => {
        getUserData(userURL,() => {
            const teamURL = 'http://127.0.0.1:5000/teams/' + teamID;
            getTeamData(teamURL,() => {
                const leagueURL = 'http://127.0.0.1:5000/leagues/' + leagueID;
                getLeagueData(leagueURL,() => {
                    const playerURL = 'http://127.0.0.1:5000/players/' + editPlayerID;
                    getPlayerData(playerURL,() => {
                        console.log("Loaded")
                    })
                });
            });
        });
    });
};

loadData();

let buttonSubmit = function(callback) {
    let newHits;
    let newRBIs;
    let newErrors;

    if(hits.value != "")
    {
        newHits = parseInt(hits.value);
    }
    else
    {
        newHits = undefined;
    }
    if(RBIs.value != "")
    {
        newRBIs = parseInt(RBIs.value);
    }
    else
    {
        newRBIs = undefined;
    }
    if(errors.value != "")
    {
       newErrors = parseInt(errors.value);
    }
    else
    {
        newErrors = undefined;
    }

    let dataToBeUpdated = {
        hits: newHits,
        RBIs: newRBIs,
        errors: newErrors
    }

    const updateURL = 'http://127.0.0.1:5000/players/increment_stats/' + editPlayerID;


    updateRequest(updateURL,dataToBeUpdated,() => {
        callback();
    })
}

let updateRequest = function(url,updateData,callback) {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if(response.ok) 
        {
            callback();
        } 
        else 
        {
            console.error('Error: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

update_player_BT.addEventListener('click', (event) =>{
    event.preventDefault();
    buttonSubmit(() => {
        window.location.replace("team_home.html");
    });
    return false;
});

let logout = function(callback) {
    const cookies = document.cookie.split(";");
    const deleteSessionURL = 'http://127.0.0.1:5000/users/delete_session/' + userCookieId;
  
    cookies.forEach(cookie => {
      console.log(cookie)
      if(cookie.trim().startsWith("UserCookie")) {
        // Set the cookie's expiration date to a past date to delete it
        document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      if(cookie.trim().startsWith("PlayerCookie")) {
        // Set the cookie's expiration date to a past date to delete it
        document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });
  
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