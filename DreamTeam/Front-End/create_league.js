/*New way to login, still have to work out bug of letting it
 go through with no pw*/
 let input = document.querySelector(".dynprog-input");
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
 }

 /*Take the sport that is selected & the league name and 
 put them in a json object*/

 const url = 'http://localhost:5000/leagues' ;

 let saveLeague = () => {
    //Get data from each element
    const sport = document.getElementById("sport");
    const leagueName = document.getElementById("league_name");

    //This variable stores all the data
    let data = "\r Sport: " + sport.value + " \r \n" 
        + "League Name: " + leagueName.value;

 }


/*This is starting to set up how to send the data back to 
the nodejs server using fetch and catch in order to do this*/
 fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 })
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.error(error));
