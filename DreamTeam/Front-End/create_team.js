//Essentially the same js as create league but this is for create team
const url = 'http://localhost:5000/teams' ;

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

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     //.then(response => console.log(response))
     //.then(data => console.log(data))
     .then(console.log("Responded"))
     .catch(error => console.error(error));
    
}

create_button.addEventListener("click", saveTeam);