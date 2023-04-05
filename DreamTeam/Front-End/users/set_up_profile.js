const url = 'http://localhost:5000/set-up-profile'

//Make the fields and button
const update_profile_BT = document.querySelector('#update_profile_button');
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const position = document.getElementById("position");
//Need to see if can get photo this way
const profile_photo = document.getElementById("profile_photo");

//Add event listeners for the fields
first_name.addEventListener("input", buildData);
last_name.addEventListener("input", buildData);
username.addEventListener("input", buildData);
bio.addEventListener("input", buildData);
position.addEventListener("input", buildData);
//first_name.addEventListener("input", buildData);


function buildData(){

    //Check if there even is a value for all fields, if not data is NULL
    if(first_name.value.trim === ''){
        first_name.value = NULL;
    }

    if(last_name.value.trim === ''){
        last_name.value = NULL;
    }

    //Username
    if(username.value.trim === ''){
        username.value = NULL;
    }

    //Bio
    if(bio.value.trim === ''){
        bio.value = NULL;
    }

    //Position
    if(position.value.trim !== ''){
        position.value = NULL;
    }
}

function SetUpUser(){
    const userData ={
        first_name: first_name.value,
        last_name: last_name.value,
        username: username.value,
        bio: bio.value,
        position: position.value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
     })
     .then(response => {
        if(response.ok){
          (console.log("Responded"));
          //Redirect to profile if account found
          window.location.replace("profile.html");
        }else{
          throw new Error('Account not found');
          window.location.replace('../error.html');
        }
     })
     .catch(error => console.error(error));
}

//Event listener for when user clicks the submit button
update_profile_BT.addEventListener('click', () =>{
    SetUpUser();
})