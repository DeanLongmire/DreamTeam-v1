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
    console.log("No User Logged in");
  }
  else
  {
    loggedIn = 1; //logged in
    console.log("User Logged In");
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


/*slideshow*/
var slidesContainer = document.querySelector('.slides');
var slides = document.querySelectorAll('.slides img');
var currentSlide = 0;
var isDragging = false;
var startPosition = 0;
var currentTranslate = 0;
var prevTranslate = 0;
if(slidesContainer!==null){
slidesContainer.addEventListener('mousedown', dragStart);
slidesContainer.addEventListener('mousemove', drag);
slidesContainer.addEventListener('mouseup', dragEnd);
slidesContainer.addEventListener('mouseleave', dragEnd);
slidesContainer.addEventListener('touchstart', touchStart);
slidesContainer.addEventListener('touchmove', touchMove);
slidesContainer.addEventListener('touchend', touchEnd);
slidesContainer.addEventListener('touchcancel', touchEnd);
}
function dragStart(event) {
  event.preventDefault();
  isDragging = true;
  startPosition = getPositionX(event);
  prevTranslate = currentTranslate;

  // Add CSS class to disable transitions during dragging
  slidesContainer.classList.add('dragging');
}

function drag(event) {
  if (isDragging) {
    var currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPosition;
    setSlidePosition();
  }
}

function dragEnd() {
  isDragging = false;

  // Remove CSS class to enable transitions after dragging
  slidesContainer.classList.remove('dragging');

  // Determine if the slide should change based on drag distance
  var slideChangeThreshold = slidesContainer.offsetWidth / 4;
  if (Math.abs(currentTranslate - prevTranslate) > slideChangeThreshold) {
    if (currentTranslate > prevTranslate) {
      if(currentSlide==0){
        currentSlide = slides.length-1;
      }
      else{currentSlide--;}
    } else if (currentTranslate < prevTranslate) {
      if(currentSlide == slides.length-1){
        currentSlide = 0;
      }
      else{currentSlide++;}
    }
  }

  // Reset the current translate value
  currentTranslate = -currentSlide * slidesContainer.offsetWidth;
  setSlidePosition();
}


function touchStart(event) {
  isDragging = true;
  startPosition = getPositionX(event.touches[0]);
  prevTranslate = currentTranslate;

  // Add CSS class to disable transitions during dragging
  slidesContainer.classList.add('dragging');
}

function touchMove(event) {
  if (isDragging) {
    var currentPosition = getPositionX(event.touches[0]);
    currentTranslate = prevTranslate + currentPosition - startPosition;
    setSlidePosition();
  }
}

function touchEnd() {
  isDragging = false;

  // Remove CSS class to enable transitions after dragging
  slidesContainer.classList.remove('dragging');

  // Determine if the slide should change based on drag distance
  var slideChangeThreshold = slidesContainer.offsetWidth / 4;
  if (Math.abs(currentTranslate - prevTranslate) > slideChangeThreshold) {
    if (currentTranslate > prevTranslate) {
      if(currentSlide==0){
        currentSlide = slides.length-1;
      }
      else{currentSlide--;}
    } else if (currentTranslate < prevTranslate) {
      if(currentSlide == slides.length-1){
        currentSlide = 0;
      }
      else{currentSlide++;}
    }
  }

  // Reset the current translate value
  currentTranslate = -currentSlide * slidesContainer.offsetWidth;
  setSlidePosition();
}

function autoAdvance() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  currentTranslate = -currentSlide * slidesContainer.offsetWidth;
  setSlidePosition();
}

// Start the automatic slideshow with a 5-second interval
if (slidesContainer !== null) {
  setInterval(autoAdvance, 5000);
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSlidePosition() {
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
}


setSlidePosition();


function toggleCollapse(elementId, button) {
  const section = document.getElementById(elementId);

  if (section.style.maxHeight) {
    section.style.maxHeight = null;
    button.classList.remove("expanded");
  } else {
    section.style.maxHeight = section.scrollHeight + "px";
    button.classList.add("expanded");
  }

  // Update the height of the aboutUsSection only if it's a sub-dropdown being toggled
  if (elementId !== 'aboutUsSection') {
    updateAboutUsSectionHeight();
  }
}

function updateAboutUsSectionHeight() {
  const aboutUsSection = document.getElementById("aboutUsSection");
  const subDropdowns = document.querySelectorAll(".sub-dropdown-content");

  let totalHeight = 0;

  subDropdowns.forEach((dropdown) => {
    if (dropdown.style.maxHeight) {
      totalHeight += parseInt(dropdown.style.maxHeight);
    }
  });

  // Add initial height value to accommodate the sub-dropdown buttons
  aboutUsSection.style.maxHeight = (totalHeight + subDropdowns.length * 70) + "px";
}


