//This is the url for the server
const url = 'http://localhost:5000/leagues'

//Make the fields and create button itself
const create_button = document.querySelector('#create_league_button');
const leagueInput = document.getElementById("league_input");
let selectedSport = null; //Define outside function

//Disable the button in the beginning
create_button.disabled = true;

//Add event listeners for league name field
leagueInput.addEventListener("input", toggleCreateButton)

//Controls the functionality of the create button
function toggleCreateButton(){
    //Get data from each element
    const sportRadios = document.getElementsByName("sport");

    //Checking if a sport is checked
    for (const sport of sportRadios) {
      if (sport.checked) {
        selectedSport = sport.value; //Setting value of selectedSport
        break;
      }
    }

    //How to disable/enable the create button so that users can't not put any input
    if(leagueInput.value.trim !== ''){
        create_button.disabled = false;
    }
    else{
        create_button.disabled = true;
    }
}

//Function to create a league on click
function createLeague(){
        const leagueName = leagueInput.value; //Set leaguename
        const data = { 
            sport: selectedSport, 
            leagueName: leagueName 
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
                // Redirect user to view their league page after successful POST request
                console.log("Responded");
                window.location.replace('league_admin.html');
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
    createLeague();
  });

//COOKIESSTUFF
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

loadData();