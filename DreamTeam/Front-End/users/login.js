//For JSON passing
//const url = 'http://localhost:5000/users/login'
const url = 'http://127.0.0.1:5000/users/login'   //HOW WE NEED TO SET URLS FROM NOW ON

//Make the email, password fields and the login bt itself
const emailField = document.querySelector('input[name="email"]');
const passwordField = document.querySelector('input[name="password"]');
const passwordToggle = document.querySelector('.password-toggle');
const loginBT = document.querySelector('#login_button');
const errorElement = document.getElementById("error-message");

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
  errorElement.style.display = "none"; //Hide the error message

  //Check if they aren't
  if(emailField.value.trim() !== '' && passwordField.value.trim() !== ''){

    loginBT.disabled = false;
  }
  
  else{
    loginBT.disabled = true;
  }
}

//Function to login user that puts the user data into file to send
//back via fetch and catch
function loginUser() {
  const userData = {
    emailField: emailField.value,
    passwordField: passwordField.value
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(userData)
  })
  .then(response => {
    if(response.ok){
      const cookies = document.cookie.split(';');
      const cookie = cookies.find(c => c.trim().startsWith('myCookie='));
      const value = cookie ? cookie.split('=')[1] : null;
      console.log(value);
    }
    else
    {
      throw new Error('Account not found');
      console.log(error.response.status);
      //if status = 500 : could not find email
      if(error.response.status === 500){
        errorElement.innerText = "*Invalid user email*";
        errorElement.style.display = "block";
      }
      //if status = 400 : Wrong password
      else if(error.response.status === 400){
        errorElement.innerText = "*Wrong Password*";
        errorElement.style.display = "block";
      }
      window.location.replace('../error.html'); //probably dont want to send them to a new page, just let them know the credintials are wrong
    }
  })
  .then( () => {
    console.log(`Cookie set: ${document.cookie}`);
    window.location.replace("profile.html");
  })
  .catch(error => console.error(error));
}

  //Event listener for when user clicks the button
  loginBT.addEventListener('click', () =>{
    loginUser();
  });
