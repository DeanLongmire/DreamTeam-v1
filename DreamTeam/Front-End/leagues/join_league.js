let userCookieId;

///COOKIE INFO
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
  let setLeagueData = function(LeagueDataJSON, callback){
    const tableBody = document.querySelector('#league-table tbody');
    const leagueInModal = document.getElementById("league_in_modal");
    const enrollPlayer = document.getElementById("confirm_enrollment");
    // Get the modal
    var modal = document.getElementById("modal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    //const leagueContainer = document.getElementById("league_contain_names");
    //const lContainer = document.getElementById("l_container");
    //const join = document.getElementById("join_button");
    names = LeagueDataJSON.names;
    sports = LeagueDataJSON.sports;
    for (let i = 0; i < names.length; i++) {
      const leagueName = names[i];
      const leagueSport = sports[i];
      const row = document.createElement('tr');
      const nameCol = document.createElement('td');
      const sportCol = document.createElement('td');
      const join = document.createElement('td');
      const join_bt = document.createElement('button');
      //const h4 = document.createElement("h4");
      //h4.textContent = leagueName;
      //leagueContainer.appendChild(h4);
      nameCol.textContent = leagueName;
      //const head = document.createElement("h4");
      if(leagueSport=== "Flag_football"){
            sportCol.textContent = "Flag Football";
          //head.textContent = "Flag Football";
      }else if(leagueSport === "Men_soccer"){
            sportCol.textContent = "Men's Soccer";
          //head.textContent = "Men's Soccer";
      }else{
          sportCol.textContent = leagueSport;
          //head.textContent = leagueSport;
      }
      //lContainer.appendChild(head);
      //const but = document.createElement("button");
      //but.textContent = "Join this league";
      join_bt.textContent = "Join this league";
      join_bt.classList.add("dynprog-button");
      join_bt.addEventListener("click", function(){
        modal.style.display = "block";
        leagueInModal.textContent = leagueName;
        enrollPlayer.addEventListener("click", function(){
            console.log("Confirm click");
            //NEED TO GET THE LEAGUE ID SO THAT WE CAN ADD THE USER TO IT!!
        });
        console.log("button clicked");
      });

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
             modal.style.display = "none";
          }
        }

      //but.style.marginBottom = "10px";
      join.appendChild(join_bt);
      row.appendChild(nameCol);
      row.appendChild(sportCol);
      row.appendChild(join);
      tableBody.appendChild(row);

    }
    callback();
  } 
  let getLeagueData = function(leagueURL, callback){
    fetch(leagueURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.ok){
        response.json().then(data =>{
          setLeagueData(data, ()=>{
          
          })
        })
      }
    })
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
          setUserData(data, () => {
            console.log("User Data Set");
            //CONTINUE FROM HERE
            leagueURL = "http://127.0.0.1:5000/leagues/"
            getLeagueData(leagueURL,()=>{
              console.log("League Data Set");
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
    callback();
  }

  let loadData = function () {
    getSessionId((userURL) => {
      console.log("URL: " + userURL);
      getUserData(userURL,() => {
        console.log("All Data Set");

      });
    });
  };

const welcomeButton = document.querySelector("#welcome-button");
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