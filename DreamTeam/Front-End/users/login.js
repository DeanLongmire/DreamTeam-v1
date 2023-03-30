//For JSON passing
const url = 'https://localhost:5000/login'

//Make the email, password fields and the login bt itself
const emailField = document.querySelector('input[name="email"]');
const passwordField = document.querySelector('input[name="password"]');
const passwordToggle = document.querySelector('.password-toggle');
const loginBT = document.querySelector('#login_button');

//Disable it in the beginning
loginBT.disabled = true;

//Add evenet listeners for the email and password fields
emailField.addEventListener('input', toggleLoginBt);
passwordField.addEventListener('input', toggleLoginBt);

//Toggles the view of password
passwordToggle.addEventListener('click', ()=>{
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);
  passwordToggle.textContent = type === 'password' ? 'Show' : 'Hide';
});

//Function to make button enable or disabled
function toggleLoginBt() {
  //Check if they aren't
  if(emailField.value.trim() !== '' && passwordField.value.trim() !== ''){

    const userData = {
      emailField: emailField.value,
      passwordField: passwordField.value
    };

    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
   })
   .then(console.log("Responded"))
   .catch(error => console.error(error));

   loginBT.disabled = false;
  }
  
  else{
    loginBT.disabled = true;
  }

}


