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
            getTeamData(teamURL, () => {
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
          })
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

//need to send this userCookieId to the client side, get the user's data, send it back to this page, and then display it appropriatly
//Also need to probably halt the page from loading all its elements while this happens

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
/*document.querySelector("#Log-Out").onclick = function(){
    alert("You have been logged out");
}*/


/*document.onreadystatechange = function() {
	if (document.readyState !== "complete") {
		document.querySelector(
		"body").style.visibility = "hidden";
		document.querySelector(
		"#loader").style.visibility = "visible";
        getData();
	} else {
		document.querySelector(
		"#loader").style.display = "none";
		document.querySelector(
		"body").style.visibility = "visible";
	}
};*/

/*function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("dynprog-show") == -1) {
      x.className += " dynprog-show";
    } else { 
      x.className = x.className.replace(" dynprog-show", "");
    }
  }*/

//Working on making the elements change for specific user
//const welcomeButton = document.querySelector("#welcome-button");
//const username;

//function getData(){
  //  console.log("in the function get data");
/*fetch(url,{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    credentials: "include",
    body:JSON.stringify
})
*/
//}



//const username = getCookie("username"); // Retrieve the value of the "username" cookie

//if (username) {
  //welcomeButton.textContent = "Welcome, " + username + "!";
//}

// Retrieve the user's first name from cookies or elsewhere
//const firstName = getFirstNameFromCookies();

// Get a reference to the <h4> element for each object
/*const firstNameHeading = document.getElementById("first_name");
const lastNameHeading = document.getElementById("last_name");
const email = document.getElementById("email");
const sports = document.getElementById("sports");
const bio = document.getElementById("bio");*/


// Update the text content of the <h4> element with the user's first name
//firstNameHeading.textContent = firstName;
//firstNameHeading.textContent = "test";


/* CODE FOR DISPLAYING PHOTOS */
/*
const imgElement = document.createElement('img');
imgElement.src = encodedPhoto;

const imageContainer = document.querySelector('#image-container');
imageContainer.appendChild(imgElement);
*/