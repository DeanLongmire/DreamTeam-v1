let loggedIn;

let getSessionId = function (callback) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith('UserCookie'));
  const userCookieId = cookie ? cookie.split('=')[1] : null;
  console.log(userCookieId);

  const sessionId = {
    id: userCookieId
  }

  if(userCookieId === null)
  {
    loggedIn = 0; // not logged in
  }
  else
  {
    loggedIn = 1; //logged in
  }

  const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;

  callback(userURL);
}
document.addEventListener("DOMContentLoaded", function() {
  // Your code to hide buttons goes here
getSessionId((userURL) => {
  if(loggedIn === 1)
  {
    //CODE OR FUNCTION HERE TO HIDE LOGIN/REGISTER 
    //ALSO ADD STUFF TO HOME BAR FOR GOING TO LEAGUE AND TEAM AND PROFILE
    var container = document.getElementById("butt-container"); //hides login and create account
    if (container !== null) {
      container.remove();
    }
  }
  if(loggedIn === 0)
  {
    var container2 = document.getElementById("butt-container-hide");//hides view teams league
    if(container2 !== null){
      container2.remove();
    }
  } 
});
});

// navbar stuff
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var navbar = document.getElementById("navbar");
  if (navbar !== null) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      navbar.style.top = "0";
    }
  }
}

window.addEventListener('scroll', () => {
  const footer = document.querySelector('.dynprog');
  const container = document.querySelector('.container');
  if (footer !== null && container !== null) {
    const containerHeight = container.offsetHeight;
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    if (currentScroll + windowHeight >= containerHeight) {
      footer.classList.add('show');
    } else {
      footer.classList.remove('show');
    }
  }
});
