/*If user selects log out, a message says they have been logged out
then they return back to the home page*/

document.querySelector("#Log-Out").onclick = function(){
    alert("You have been logged out");
}

function saveEdits(){
    
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