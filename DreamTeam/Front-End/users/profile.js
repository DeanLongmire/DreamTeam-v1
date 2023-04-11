/*If user selects log out, a message says they have been logged out
then they return back to the home page*/

//COOKIE INFO
const cookies = document.cookie.split(';');
const cookie = cookies.find(c => c.trim().startsWith('myCookie='));
const userCookieId = cookie ? cookie.split('=')[1] : null;
console.log(userCookieId);

//need to send this userCookieId to the client side, get the user's data, send it back to this page, and then display it appropriatly
//Also need to probably halt the page from loading all its elements while this happens

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


/* CODE FOR DISPLAYING PHOTOS */
/*
const imgElement = document.createElement('img');
imgElement.src = encodedPhoto;

const imageContainer = document.querySelector('#image-container');
imageContainer.appendChild(imgElement);
*/