/*Login JS to make users complete all fields have to fix functionality
still moves on even if fields aren't actually filled*/
/*document.getElementById("Login").onclick = function() {
    let allAreFilled = true;
    document.getElementById("sign-in").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (i.type === "radio") {
    let radioValueCheck = false;
    document.getElementById("sign-in").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
    if (r.checked) radioValueCheck = true;
    })
      $('#Login').prop('disabled', false);
      allAreFilled = radioValueCheck;
      return;
    }
    if (!i.value) { allAreFilled = false;  return; }
  })
  if (!allAreFilled) {
    alert('Fill all the fields');
    $('#Login').prop('disabled', true);
  }
};*/

/*New way to login, still have to work out bug of letting it
 go through with no pw*/
 /*
let email = document.querySelector("email");
let password = document.querySelector("password")
let button = document.querySelector(".Login");
Login.disabled = true;
input.addEventListener("change", stateHandle);

function stateHandle(){
  if(document.querySelector("email").value === ""){
    Login.disabled = true;
  }
  if(document.querySelector("password").value === ""){
    Login.disabled = true;
  }
  else{
    Login.disabled = false;
  }
}
*/

/*const login=document.getElementById("Login_button");

const email=document.getElementById("email");
const password=document.getElementById("password");

const loginUser = () => {
  login.disable = !(
    email.value && password.value !== ""
  )
}

email.addEventListener("change", loginUser);
password.addEventListener("change", loginUser);
*/

let login_button = document.getElementById("Login_button");
login_button.disabled = true;

let login = () => {
  if(email.value === ""){
    alert("Please fil out the email field.");
    const email = document.getElementById("email");
    login_button.disabled = true;
  }
  else if(password.value === ""){
    alert("Please enter your password.");
    const password = document.getElementById("password");
    login_button.disabled = true;
  }
  else{
    login_button.disabled = false;
  }
}

const form = document.querySelector('#sign-in');
