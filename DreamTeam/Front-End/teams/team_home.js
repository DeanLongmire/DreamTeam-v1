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

//Reference for username
let userNameHeading = document.getElementById("username");
let username = null;

//Setting the username
let setUserData = function (userDataJSON,callback) {
    console.log(userDataJSON.username);
    if(userDataJSON.username){
      username = userDataJSON.username;
      welcomeButton.textContent = "Welcome, " + username + "!";
    };
    callback();
  }

//Logout
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
  
  document.querySelector("#Log-Out").onclick = function(){
    logout(() => {
      window.location.replace("../home/index.html");
    });
  }