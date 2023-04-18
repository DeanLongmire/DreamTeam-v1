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

let setUserData = function (dataJson,callback) {
  const ud = JSON.stringify(dataJson);
  document.cookie = `userData=${ud}`
  callback();
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
        document.cookie = "hasLoaded=1";
        setUserData(data, () => {
          getTeamUrl((teamURL) => {
            getTeamData(teamURL, () => {
              console.log("TEST3");
            })
          })
        });
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

let getTeamData = function (teamURL, callback) {
  fetch(teamURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(response => {
    if (response.ok) {
      console.log("Responded");
      callback();
    } 
    else {
      console.error('Error: ' + response.statusText);
    }
  })
  .catch(error => {
    console.error(error);
  });
}

let getTeamUrl = function (callback) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('userData='));
  const userData = cookie ? JSON.parse(cookie.split('=')[1]) : null;

  const teamURL = 'http://127.0.0.1:5000/teams/' + userData.teamID;
  console.log(teamURL);

  callback(teamURL);
}

let start = function () {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('hasLoaded='));
  const hasLoaded = cookie ? parseInt(cookie.split('=')[1]) : 0;
  console.log(hasLoaded);
  if(hasLoaded === 0)
  {
    loadData();
  }
};

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,() => {
      console.log("test2");
      return false;
    });
  });
};

start();

/*let getSessionId = function (callback) {
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
    if(response.ok)
    {
      callback(true);
    }
    else
    {
      console.log('Error: ' + response.status);
      callback(false);
    }
  })
  .catch(error => {
    console.log(error);
  });
}

let start = function () {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('hasLoaded='));
  const hasLoaded = cookie ? parseInt(cookie.split('=')[1]) : 0;
  console.log(hasLoaded);
  if(hasLoaded === 0)
  {
    loadData();
  }
}

let loadData = function () {
  getSessionId((userURL) => {
    console.log("URL: " + userURL);
    getUserData(userURL,(success) => {
      console.log("Test2");
      if(success){
        // Data was retrieved successfully, so prevent page from reloading
        console.log("Page reload prevented");
      } else {
        // Data retrieval failed, allow page to reload
        console.log("Page reload allowed");
      }
    })
  })
};

start();*/


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