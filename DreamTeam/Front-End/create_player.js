// Essentially the same js as create league/team but this is for creating the player on a team
const url = 'http://localhost:5000/players' ;

let create_button = document.getElementById("create_player");

//How the data is able to be receieved that the user selects, inputs
let savePlayer = () => {
    const playerInput = document.getElementByName("player_name");
    const playerName = playerInput.value;

    const positionInput = document.getElementsByName("player_position");
    const playerPosition = positionInput.value;
    
    console.log(playerName);
    console.log(playerPosition);
    console.log(`Player: ${playerName} has position: ${playerPosition}`);

    const data = { 
      player: playerName,
      position: playerPosition 
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
     //.then(response => console.log(response))
     //.then(data => console.log(data))
     .then(console.log("Responded"))
     .catch(error => console.error(error));
    
}

create_button.addEventListener("click", savePlayer);