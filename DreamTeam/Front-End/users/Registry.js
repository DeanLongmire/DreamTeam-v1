//First section is just for form checking
var form = document.getElementById("regform");
var registerButton = document.getElementById("create_account");
var passwordInput = document.getElementById("psw");
var confirmPasswordInput = document.getElementById("psw-repeat");

registerButton.setAttribute("disabled", "disabled");

function checkFormInputs() {
  var inputs = form.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      return false; // Input is empty, return false
    }
  }
  if (passwordInput.value !== confirmPasswordInput.value) {
    return false; // Passwords do not match, return false
  }
  return true; // All inputs are filled, return true
}

function handleButtonState() {
  if (checkFormInputs()) {
    registerButton.removeAttribute("disabled");
  } else {
    registerButton.setAttribute("disabled", "disabled");
  }
}

// Add event listeners to form inputs
var inputs = form.querySelectorAll("input");
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", handleButtonState);
}


//this section is for passing information to the back-end

//const url = 'https://localhost:5000/users';
const url = 'http://localhost:5000/users';


let create_button = document.getElementById("create_account");
let saveUser = () => {
  const nameInput = document.getElementById("name");
  const name = nameInput.value;

  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  
  const passwordInput = document.getElementById("psw");
  const password = passwordInput.value;

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(`User: ${name} has email: ${email} and password ${password}`);

  const data = { 
    name: name,
    email: email,
    password: password
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
      if (response.ok) {
        // Redirect user to profile page after successful POST request
        window.location.replace('set_up_profile.html');
      } else {
        // Handle error response
        throw new Error('Unable to create user account');
      }
     })
     .catch(error => console.error(error));
    
}

create_button.addEventListener("click", saveUser);