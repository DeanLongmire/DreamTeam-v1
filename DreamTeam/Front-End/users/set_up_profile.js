//Make the fields and button
const update_profile_BT = document.querySelector('#update_profile_button');
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const position = document.getElementById("position");
const errorElement = document.getElementById("error-message");
//Need to see if can get photo this way
const profile_photo = document.getElementById("profile_photo");
let encodedPhoto;

//Add event listeners for the fields
first_name.addEventListener("input", buildData);
last_name.addEventListener("input", buildData);
username.addEventListener("input", buildData);
bio.addEventListener("input", buildData);
position.addEventListener("input", buildData);
profile_photo.addEventListener("input", buildData);

function buildData(){

    //Check if there even is a value for all fields, if not data is NULL
    if(first_name.value.trim === ''){
        first_name.value = null;
    }

    if(last_name.value.trim === ''){
        last_name.value = null;
    }

    //Username
    if(username.value.trim === ''){
        username.value = null;
    }

    //Bio
    if(bio.value.trim === ''){
        bio.value = null;
    }

    //Position
    if(position.value.trim === ''){
        position.value = null;
    }

    //Picture
    if(profile_photo.value.trim() === ''){
        profile_photo.value = null;
    }
    else{
        const pic = profile_photo.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(pic);
        reader.onload = function() {
            encodedPhoto = reader.result;
        };
    }
}

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

let buttonSubmit = function () {
    let numOfInputs = getNumOfInputs();
    getSessionId((url) => {
        getUserData(url, (id) => {
            console.log(id);
            waitOnRequest(numOfInputs,id).then(() => {
                window.location.replace("profile.html");
            })
            .catch(error => {
                console.log(error);
            })
        });
    });
};

let makeRequest = function (dataToBeUpdated, url, callback) {
    errorElement.style.display = "none"; //Hide the error message
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToBeUpdated)
     })
     .then(response => {
        if(response.ok){
          (console.log("Responded"));
          callback();
        }else{
          if(response.status === 413){
            console.log("Picture Too Big");  //MAKE THIS GO TO SCREEN
            errorElement.innerText = "*The picture you uploaded is too big*";
            errorElement.style.display = "block";
        }
        }
     })
     .catch(error => console.error(error));
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
          console.log(data.id);
          callback(data.id);
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

const waitOnRequest = function (numOfInputs, userID,) {
    return new Promise((resolve,reject) => {
        let proccessed = 0;
        if(numOfInputs === proccessed) resolve();
        if(first_name.value !== "")
        {
            const fn = {
                fn: first_name.value
            }
            const updateFNUrl = 'http://127.0.0.1:5000/users/update_firstname/' + userID;
            makeRequest(fn,updateFNUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
        if(last_name.value !== "")
        {
            const ln = {
                ln: last_name.value
            }
            const updateLNUrl = 'http://127.0.0.1:5000/users/update_lastname/' + userID;
            makeRequest(ln,updateLNUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
        if(username.value !== "")
        {
            const un = {
                un: username.value
            }
            const updateUNUrl = 'http://127.0.0.1:5000/users/update_username/' + userID;
            makeRequest(un,updateUNUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
        if(bio.value !== "")
        {
            const bioJSON = {
                bio: bio.value
            }
            const updateBUrl = 'http://127.0.0.1:5000/users/update_bio/' + userID;
            makeRequest(bioJSON,updateBUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
        if(position.value !== "")
        {
            const pos = {
                pos: position.value
            }
            const updatePOSUrl = 'http://127.0.0.1:5000/users/update_position/' + userID;
            makeRequest(pos,updatePOSUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
        if(profile_photo.value !== "")
        {
            const pp = {
                pp: encodedPhoto
            }
            const updatePPUrl = 'http://127.0.0.1:5000/users/update_picture/' + userID;
            makeRequest(pp,updatePPUrl, () => {
                proccessed += 1;
                if(proccessed === numOfInputs) resolve();
            });
        }
    });
};

let getNumOfInputs = function () {
    let numOfInputs = 0;

    if(first_name.value !== "")    numOfInputs += 1;
    if(last_name.value !== "")     numOfInputs += 1;
    if(username.value !== "")      numOfInputs += 1;
    if(bio.value !== "")           numOfInputs += 1;
    if(position.value !== "")      numOfInputs += 1;
    if(profile_photo.value !== "") numOfInputs += 1;

    return numOfInputs;
}

//Event listener for when user clicks the submit button
update_profile_BT.addEventListener('click', (event) =>{
    event.preventDefault();
    buttonSubmit();
    return false;
});