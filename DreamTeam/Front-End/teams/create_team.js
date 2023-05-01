//Essentially the same js as create league but this is for create team
//const url = 'https://localhost:5000/teams';
/*const url = 'http://localhost:5000/teams';

let create_button = document.getElementById("create_team_button");

//How the data is able to be receieved that the user selects, inputs
let saveTeam = () => {
    //Get data from each element
    const numPlayerRadios = document.getElementsByName("num_players");
    let selectedSize;

    for (const size of numPlayerRadios) {
      if (size.checked) {
      selectedSize = size.value;
      break;
      }
    }

    //console.log(selectedSize);

    const teamInput = document.getElementById("team_input");
    const teamName = teamInput.value;
    
    //console.log(teamName);

    const data = { 
      size: selectedSize, 
      teamName: teamName 
    };

    console.log(data);

    //This is the fetch and catch stuff to send it back to the server
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response.body);
      console.log(response.type);
      if (response.ok) {
        console.log("Check");
        window.location.replace('view_teams.html');
      } else {
        console.log("Error");
        throw new Error('Unable to create user account');
      }
    })
    .catch(error => {
      console.error(error);
      console.log("Catch block executed");
    });
}

create_button.addEventListener("click", saveTeam);
*/

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

loadData();


const url = 'http://localhost:5000/teams'

//Make the fields and create button
const create_button = document.querySelector('#create_team_button');
const teamInput = document.getElementById("team_input");
let selectedSize = null; //Define outside the function

//Disable the button in the beginning
create_button.disabled = true;

//Add event listener for team name field
teamInput.addEventListener("input", toggleCreateButton)

//Controls the functionality of the create button
function toggleCreateButton(){
  //get data from each element
  const numPlayerRadios = document.getElementsByName("num_players");

  //Checking the amount of players checked
  for (const num_players of numPlayerRadios){
    if(num_players.checked){
      selectedSize = num_players.value; //Setting value of selected size
      break;
    }
  }

  //How to disable/enable the create button so user forced to put input
  if(teamInput.value.trim !== ''){
    create_button.disabled = false;
  }
  else{
    create_button.disabled = true;
  }
}

//Function to create a team on click
//Function to create a league on click
function createTeam(){
  const teamName= teamInput.value; //Set leaguename
  const data = { 
      num_players: selectedSize, 
      teamName: teamName 
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
          window.location.replace('lteam_admin.html');
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
createTeam();
});