//GLOBALS
let teamID;
let leagueID;
let editPlayerID;
let userCookieId;

//Set HTML objects
const welcomeButton = document.querySelector("#welcome-button");
const update_player_BT = document.getElementById('update_stats_button');
let playerName = document.getElementById("player_name");

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

let setUserData = function(userDataJSON,callback) {
    welcomeButton.textContent = "Welcome, " + userDataJSON.username + "!";
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
                    console.log("Blob")
                });
            });
        });
    });
};

loadData();

let buttonSubmit = function() {

}

update_player_BT.addEventListener('click', (event) =>{
    event.preventDefault();
    buttonSubmit();
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