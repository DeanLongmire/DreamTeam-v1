/*New way to login, still have to work out bug of letting it
 go through with no pw*/
 /*let input = document.querySelector(".dynprog-input");
 let button = document.querySelector(".create_league");
 create_league.disabled = true;
 input.addEventListener("change", stateHandle);
 
 function stateHandle(){
   if(document.querySelector(".dynprog-input").value === ""){
     create_league.disabled = true;
   }
   else{
     create_league.disabled = false;
   }
 }*/

 /*Take the sport that is selected & the league name and 
 put them in a json object*/

const url = 'http://localhost:5000/leagues' ;

let create_button = document.getElementById("create_league_button");

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
    const leagueName = leagueInput.value;
    console.log(leagueName);

    //This variable stores all the data
    //let data = "\r Sport: " + sport.value + " \r \n" 
    //    + "League Name: " + leagueName.value;
}

create_button.addEventListener("click", saveLeague);


/*This is starting to set up how to send the data back to 
the nodejs server using fetch and catch in order to do this
 fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));*/
