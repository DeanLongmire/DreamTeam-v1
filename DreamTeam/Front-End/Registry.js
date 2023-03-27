
/*
document.getElementById("create_account").onclick = function() {
let allAreFilled = true;
document.getElementById("regform").querySelectorAll("[required]").forEach(function(i) {
if (!allAreFilled) return;
if (i.type === "radio") {
let radioValueCheck = false;
document.getElementById("regform").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
if (r.checked) radioValueCheck = true;
})
  allAreFilled = radioValueCheck;
  return;
}
if (!i.value) { allAreFilled = false;  return; }
})
if (!allAreFilled) {
alert('Fill all the fields');
}
};
*/

//attempting to print the data
const form = document.querySelector('#myForm');

// Get the input values from the form
const name = form.querySelector('#username').value;
const email = form.querySelector('#email').value;
const password = form.querySelector('#password').value;
const repassword = form.querySelector('#repassword').value;

// Create the JSON object
const data = {
  username: username,
  email: email,
  password: password,
  repassword: repassword
};

// Convert the JSON object to a string
const jsonString = JSON.stringify(data);

// Print the JSON string
console.log(jsonString);

// Parse the JSON string back into an object
const jsonObject = JSON.parse(jsonString);

// Print the JSON object
console.log(jsonObject);







