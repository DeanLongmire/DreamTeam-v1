/*//----------------------------------------------------First section is just for form checking
// var form = document.getElementById("regform");
// var registerButton = document.getElementById("create_account");
// var passwordInput = document.getElementById("psw");
// var confirmPasswordInput = document.getElementById("psw-repeat");
// var errorElement = document.getElementById("password-error-message");

// registerButton.setAttribute("disabled", "disabled");

// function checkFormInputs() {
//   var inputs = form.querySelectorAll("input");
//   for (var i = 0; i < inputs.length; i++) {
//     if (inputs[i].value === "") {
//       return false; // Input is empty, return false
//     }
//   }
//   if( passwordInput.value !== confirmPasswordInput.value) {
//     var errorMessage = "Passwords Do Not Match"; //error message for invalid password
//     errorElement.innerText = errorMessage;
//     errorElement.style.display = "block"
//     return false; // Passwords do not match, return false
//   }
//   var passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/;// Regex to match passwords containing at least one digit and being at least 8 characters long
//   if (!passwordRegex.test(passwordInput.value)) {
//     var errorMessage = "Password must be at least 8 characters long and contain at least one number."; //error message for invalid password
//     errorElement.innerText = errorMessage;
//     errorElement.style.display = "block"
//     return false; //Password does not meet the requirements, return false
//   }
//   return true; // All inputs are filled, return true
// }

// function handleButtonState() {
//   if (checkFormInputs()) {
//     registerButton.removeAttribute("disabled");
//     var errorElement = document.getElementById("password-error-message");
//     errorElement.style.display = "none"; // Hide the error message
//   } else {
//     registerButton.setAttribute("disabled", "disabled");
//   }
// }

// // Add event listeners to form inputs
// var inputs = form.querySelectorAll("input");
// for (var i = 0; i < inputs.length; i++) {
//   inputs[i].addEventListener("input", handleButtonState);
// }

// // Add event listener to password input field, this masks the inputs with '*'
// passwordInput.addEventListener("input", function() {
//   const password = passwordInput.value;
//   const maskedPassword = '*'.repeat(password.length - 1) + password.charAt(password.length - 1);
//   passwordInput.value = maskedPassword;

//   var passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/;
//   if (passwordRegex.test(password)) {
//     errorElement.style.display = "none"; // Hide the error message
//   }
// });
// //same for password repeat
// confirmPasswordInput.addEventListener("input", function() {
//   const confirmPassword = confirmPasswordInput.value;
//   const confirmMaskedPassword = '*'.repeat(confirmPassword.length - 1) + confirmPassword.charAt(confirmPassword.length - 1);
//   confirmPasswordInput.value = confirmMaskedPassword;
// });
*/
const form = document.getElementById("regform");
const registerButton = document.getElementById("create_account");
const passwordInput = document.getElementById("psw");
const confirmPasswordInput = document.getElementById("psw-repeat");
const errorElement = document.getElementById("password-error-message");
const passwordToggle = document.getElementById("password-toggle");

registerButton.setAttribute("disabled", "disabled");

function checkFormInputs() {
  const inputs = form.querySelectorAll("input");
  for (const input of inputs) {
    if (input.value === "") {
      return false; // Input is empty, return false
    }
  }
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorElement.innerText = "*Passwords do not match*";
    errorElement.style.display = "block";
    return false; // Passwords do not match, return false
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/; // Regex to match passwords containing at least one digit and being at least 8 characters long
  if (!passwordRegex.test(passwordInput.value)) {
    errorElement.innerText = "*Password must be at least 8 characters long and contain at least one number.*";
    errorElement.style.display = "block";
    return false; //Password does not meet the requirements, return false
  }
  return true; // All inputs are filled, return true
}

function handleButtonState() {
  if (checkFormInputs()) {
    registerButton.removeAttribute("disabled");
    errorElement.style.display = "none"; //Hide the error message
  } else {
    registerButton.setAttribute("disabled", "disabled");
  }
}

// Add event listeners to form inputs
const inputs = form.querySelectorAll("input");
for (const input of inputs) {
  input.addEventListener("input", handleButtonState);
}

let isPasswordVisible = false;

passwordToggle.addEventListener("click", () => {
  if (isPasswordVisible) {
    passwordInput.setAttribute("type", "password");
    confirmPasswordInput.setAttribute("type", "password");
    isPasswordVisible = false;
  } else {
    passwordInput.setAttribute("type", "text");
    confirmPasswordInput.setAttribute("type", "text");
    isPasswordVisible = true;
  }
});


//---------------------------this section is for passing information to the back-end

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