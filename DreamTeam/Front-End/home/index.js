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
    loggedIn = 0;
  }
  else
  {
    loggedIn = 1;
  }

  const userURL = 'http://127.0.0.1:5000/users/' + sessionId.id;

  callback(userURL);
}

getSessionId((userURL) => {
  if(loggedIn === 1)
  {
    //CODE OR FUNCTION HERE TO HIDE LOGIN/REGISTER 
    //ALSO ADD STUFF TO HOME BAR FOR GOING TO LEAGUE AND TEAM AND PROFILE
  }
});

// navbar stuff
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  }
}
window.addEventListener('scroll', () => {
      const footer = document.querySelector('.dynprog');
      const containerHeight = document.querySelector('.container').offsetHeight;
      const currentScroll = window.pageYOffset;
      const windowHeight = window.innerHeight;
      if (currentScroll + windowHeight >= containerHeight) {
        footer.classList.add('show');
      } else {
        footer.classList.remove('show');
      }
    });