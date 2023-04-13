//script code for the home page
// Define variables for the dinosaur element and the buttons
var dino = document.getElementById("dinosaur");
var buttons = document.querySelectorAll(".dynprog-homebutton");

// Define initial position of dinosaur and distance to travel
var currentPosition = 0;
var distanceToTravel = window.innerWidth - 100;

// Move dinosaur across the screen and make it hop over each button
function moveDinosaur() {
  if (currentPosition < distanceToTravel) {
    currentPosition += 10;
    dino.style.left = currentPosition + "px";
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      var buttonPosition = button.getBoundingClientRect();
      var dinoPosition = dino.getBoundingClientRect();
      if (dinoPosition.left >= buttonPosition.left && dinoPosition.left <= buttonPosition.right && dinoPosition.bottom >= buttonPosition.top) {
        dino.classList.add("jump");
      } else {
        dino.classList.remove("jump");
      }
    }
  } else {
    currentPosition = 0;
  }
  window.requestAnimationFrame(moveDinosaur);
}

// Call moveDinosaur function to start animation
moveDinosaur();

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