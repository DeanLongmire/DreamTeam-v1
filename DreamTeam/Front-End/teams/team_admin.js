//Team Admin JS form
const url = 'http://127.0.0.1:5000/teams/team_admin'   //HOW WE NEED TO SET URLS FROM NOW ON

let teamID;

//Form stuff will go here
const update_team_BT = document.querySelector('#update_team_button');
const team_name = document.querySelector('#team_name');
const team_photo = document.querySelector('#profile_photo');
let selectedSport = null; //Define outside function
const sportsRadios = document.getElementsByTagName("sport");
//Need to see if can get photo this way
const profile_photo = document.getElementById("profile_photo");
let encodedPhoto;

team_name.addEventListener("input", buildData);
//team_photo.addEventListener("input", buildData);

function buildData() {

  //Check if there is even a value for the field
  if(team_name.value.trim === '') {
    team_name.value = null;
  }

  //Picture
  if(profile_photo.value.trim() === '') {
    profile_photo.value = null;
  }
  else {
    const pic = profile_photo.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(pic);
    reader.onload = function () {
      encodedPhoto = reader.result;
    };
  }
}

//COOKIE INFO
let getSessionId = function(callback) {
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

let getUserData = function (url, callback) {
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
            if (data.teamID !== null) {
              getTeamData(teamURL, () => {
                callback();
              });
            }
            else {
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
            teamID = data.id;
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
          console.log("League Data Set");
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

//Reference for username
const welcomeButton = document.querySelector("#welcome-button");
let userNameHeading = document.getElementById("username");
let username = null;

let setUserData = function (userDataJSON, callback) {
  console.log(userDataJSON.username);
  //FOR JULIANA : PUT CODE HERE TO FILL IN HTML WITH USER DATA (USE THE 'userDataJSON' OBJECT)
  if (userDataJSON.username) {
    username = userDataJSON.username;
    welcomeButton.textContent = "Welcome, " + username + "!";
  };
  callback();
}

let logout = function (callback) {
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

//Need to add team and league after get it working on profile

let makeRequest = function (dataToBeUpdated, url, callback) {
  //errorElement.style.display = "none"; //Hide the error message
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
          //errorElement.innerText = "*The picture you uploaded is too big*";
          //errorElement.style.display = "block";
      }
      }
   })
   .catch(error => console.error(error));
}

const waitOnRequest = function (numOfInputs, userID,) {
  return new Promise((resolve,reject) => {
      let proccessed = 0;
      if(numOfInputs === proccessed) resolve(); //if zero fields were updated
      if(team_name.value !== "") //if the field is filled in
      {
          const tn = {
              newName: team_name.value   //get the value entered
          }
          const updateTNUrl = 'http://127.0.0.1:5000/teams/update_team_name/' + teamID;  //construct patch URL
          makeRequest(tn,updateTNUrl, () => {  //make the patch request, see makeRequest function
              proccessed += 1;                  //increment the number of proccessed requests
              if(proccessed === numOfInputs) resolve();   //if the number proccessed equals number inputted, all requests processed, return
          });
      }
      if(team_photo.value !== "")
      {
          const photo = {
              pp: last_name.value
          }
          const updatePPUrl = 'http://127.0.0.1:5000/teams/update_picture/' + teamID;
          makeRequest(photo,updatePPUrl, () => {
              proccessed += 1;
              if(proccessed === numOfInputs) resolve();
          });
      }
  });
};

let getNumOfInputs = function () {
  let numOfInputs = 0;

  if(team_name.value !== "")    numOfInputs += 1;
  if(team_photo.value !== "")   numOfInputs += 1;

  return numOfInputs;
}

let buttonSubmit = function () {
  let numOfInputs = getNumOfInputs(); //get number of fields that the user entered
  getSessionId((url) => { //get user from session store to get user ID
      getUserData(url, (id) => { //get user ID
          waitOnRequest(numOfInputs,id).then(() => {  //make patch requests until the number of fields match proccessed, returning when all requests have been made
              window.location.replace("team_home.html"); //take back to team home page
          })
          .catch(error => {
              console.log(error);
          })
      });
  });
};

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function () {
  logout(() => {
    window.location.replace("../home/index.html");
  });
}

update_team_BT.addEventListener('click',(event) => {
  event.preventDefault();
  buttonSubmit();
  return false;
})