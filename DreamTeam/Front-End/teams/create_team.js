//Essentially the same js as create league but this is for create team
const url = 'https://localhost:5000/teams' ;

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