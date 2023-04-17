

//COOKIE INFO
const cookies = document.cookie.split(';');
const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
const userCookieId = cookie ? cookie.split('=')[1] : null;
console.log(userCookieId);

//need to send this userCookieId to the client side, get the user's data, send it back to this page, and then display it appropriatly
//Also need to probably halt the page from loading all its elements while this happens

/*If user selects log out, a message says they have been logged out
then they return back to the home page*/
document.querySelector("#Log-Out").onclick = function(){
    alert("You have been logged out");
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("dynprog-show") == -1) {
      x.className += " dynprog-show";
    } else { 
      x.className = x.className.replace(" dynprog-show", "");
    }
  }

//Working on making the elements change for specific user
const welcomeButton = document.querySelector("#welcome-button");
//const username = getCookie("username"); // Retrieve the value of the "username" cookie

//if (username) {
  welcomeButton.textContent = "Welcome, " + username + "!";
//}

// Retrieve the user's first name from cookies or elsewhere
//const firstName = getFirstNameFromCookies();

// Get a reference to the <h4> element for each object
const firstNameHeading = document.getElementById("first_name");
const lastNameHeading = document.getElementById("last_name");
const email = document.getElementById("email");
const sports = document.getElementById("sports");
const bio = document.getElementById("bio");


// Update the text content of the <h4> element with the user's first name
//firstNameHeading.textContent = firstName;
firstNameHeading.textContent = "test";


/* CODE FOR DISPLAYING PHOTOS */
/*
const imgElement = document.createElement('img');
imgElement.src = encodedPhoto;

const imageContainer = document.querySelector('#image-container');
imageContainer.appendChild(imgElement);
*/