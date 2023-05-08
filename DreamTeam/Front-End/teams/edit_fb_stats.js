//GLOBALS
let teamID;
let leagueID;
let editPlayerID;

//Set HTML objects
const welcomeButton = document.querySelector("#welcome-button");
let playerName = document.getElementById("player_name");

//get sessionId from cookie
let getSessionId = function(callback) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
    let userCookieId = cookie ? cookie.split('=')[1] : null;
  
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