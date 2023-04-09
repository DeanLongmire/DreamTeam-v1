/*Take the sport that is selected & the league name and 
 put them in a json object*/
/*
//const url = 'https://localhost:5000/leagues';
const url = 'http://localhost:5000/leagues';

let create_button = document.getElementById("create_league_button");
//const create_button = document.getElementById("create_league_button");

//create_button.disabled = true;

let saveLeague = () => {
    //Get data from each element
    const sportRadios = document.getElementsByName("sport");
    let selectedSport;

    for (const sport of sportRadios) {
      if (sport.checked) {
      selectedSport = sport.value;
      break;
      }
    }

    const leagueInput = document.getElementById("leageue_input");
    leagueInput.addEventListener("input", toggleCreateButton)

    function toggleCreateButton(){
        if(leagueInput.value.trim() === ""){
            create_button.disabled = true;
        }
        else{
            create_button.disaebled = false;
        }
    }

    const leagueName = leagueInput.value;
    //console.log(leagueName);

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
     //.then(response => console.log(response))
     //.then(data => console.log(data))
     .then(response => {
        if (response.ok) {
          // Redirect user to view their league page after successful POST request
          console.log("Responded");
          window.location.replace('view_leagues.html');
        } else {
          // Handle error response
          throw new Error('Unable to create user account');
        }
      })
     .catch(error => console.error(error));

     create_button.reset();
    
}

create_button.addEventListener("click", saveLeague);
*/

const url = 'http://localhost:5000/leagues'

//Make the fields and create button itself
const create_button = document.querySelector('#create_league_button');
const leagueInput = document.getElementById("league_input");
let selectedSport = null; //Define outside function

//Disable the button in the beginning
create_button.disabled = true;

//Add event listeners for league name field
leagueInput.addEventListener("input", toggleCreateButton)

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
