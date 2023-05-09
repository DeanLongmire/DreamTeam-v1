//League Admin JS form
const url = 'http://127.0.0.1:5000/leagues/league_admin'   //HOW WE NEED TO SET URLS FROM NOW ON

//Form stuff will go here
const update_league_BT = document.querySelector('#update_league_button');
const league_name = document.querySelector('#league_name');
const league_photo = document.querySelector('league_photo');
const sportsRadios = document.getElementsByTagName("sport");
const errorElement = document.getElementById("error-message");
//Need to see if can get photo this way
const profile_photo = document.getElementById("profile_photo");
league_name.addEventListener("input", buildData);
profile_photo.addEventListener("input", buildData);
let encodedPhoto;
let selectedSport = null; //Define outside function
let leagueID;

function buildData(){  
  //Check if there is even a value for the field
  if(league_name.value.trim === ''){
      league_name.value = null;
    }

    //Radio buttons
    //Get data from each element
    const sportRadios = document.getElementsByName("sport");

    //Checking if a sport is checked
    for (const sport of sportRadios) {
        if (sport.checked) {
        selectedSport = sport.value; //Setting value of selectedSport
        break;
        }
    }

    //Picture
    if(profile_photo.value.trim() === ''){
      profile_photo.value = null;
  }
  else{
      const pic = profile_photo.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = function() {
          encodedPhoto = reader.result;
      };
  }
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
  
  let buttonSubmit = function () {
    let numOfInputs = getNumOfInputs(); //get number of fields that the user entered
    getSessionId((url) => { //get user from session store to get user ID
        getUserData(url, (id) => { //get user ID
            waitOnRequest(numOfInputs,leagueID).then(() => {  //make patch requests until the number of fields match proccessed, returning when all requests have been made
                window.location.replace("league_home.html"); //take back to league home page
            })
            .catch(error => {
                console.log(error);
            })
        });
    });
};

let makeRequest = function (dataToBeUpdated, url, callback) {
  errorElement.style.display = "none"; //Hide the error message
  fetch(url, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToBeUpdated)
   })
   .then(response => {
      if(response.ok){
        (console.log("Responded"));
        callback();
      }else{
        if(response.status === 413){
          console.log("Picture Too Big");  //MAKE THIS GO TO SCREEN
          errorElement.innerText = "*The picture you uploaded is too big*";
          errorElement.style.display = "block";
      }
      }
   })
   .catch(error => console.error(error));
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
  
          leagueID = data.leagueID;
          console.log(leagueID);
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
  
  const waitOnRequest = function(numOfInputs, leagueID,){
    return new Promise((resolve, reject) => {
      let proccessed = 1;
      if(numOfInputs === proccessed) resolve(); //Only sport updated
      if(league_name.value !== "")
      {
        const newName = {
          newName: league_name.value //get the value
        }
        console.log(league_name.value);
        console.log(leagueID);
        const updateFNUrl = 'http://127.0.0.1:5000/leagues/update_name/' + leagueID;  //construct patch URL
        makeRequest(newName, updateFNUrl, () => {
              proccessed += 1;
              if(proccessed === numOfInputs) resolve();
        });
      }
      if (selectedSport){
        const newSport = {
          newSport: selectedSport
        }
        console.log(selectedSport);
        console.log(leagueID);
        const updateFNUrl = 'http://127.0.0.1:5000/leagues/update_sport/' + leagueID;  //construct patch URL
        makeRequest(newSport, updateFNUrl, () => {
              proccessed += 1;
              if(proccessed === numOfInputs) resolve();
        }); 
      }
      if(profile_photo.value !== "")
        {
            const pp = {
                pp: encodedPhoto
            }
            const updatePPUrl = 'http://127.0.0.1:5000/leagues/update_picture/' + leagueID;
            makeRequest(pp,updatePPUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
    });
  };

  let getNumOfInputs = function (){
    let numOfInputs = 1;
    if(league_name.value !== "")    numOfInputs += 1;
    if(profile_photo.value !== "")  numOfInputs += 1;

    return numOfInputs;
  }

  //Event listener for when user clicks the submit button
update_league_BT.addEventListener('click', (event) =>{
  event.preventDefault();
  buttonSubmit();
  return false;
});

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
  
  /*let getLeagueData = function (leagueURL, callback) {
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
  }*/

  //Reference for username
const welcomeButton = document.querySelector("#welcome-button");
let userNameHeading = document.getElementById("username");
let username = null;

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      console.log("All Data Set");
    });
  });
};

let setUserData = function (userDataJSON,callback) {
    console.log(userDataJSON.username);
    //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
    if(userDataJSON.username){
      username = userDataJSON.username;
      welcomeButton.textContent = "Welcome, " + username + "!";
    };
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

loadData();

//Need to add team and league after get it working on profile

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
  logout(() => {
    window.location.replace("../home/index.html");
  });
}