var slidesContainer = document.querySelector('.slides');
var slides = document.querySelectorAll('.slides img');
var currentSlide = 0;
var isDragging = false;
var startPosition = 0;
var currentTranslate = 0;
var prevTranslate = 0;

slidesContainer.addEventListener('mousedown', dragStart);
slidesContainer.addEventListener('mousemove', drag);
slidesContainer.addEventListener('mouseup', dragEnd);
slidesContainer.addEventListener('mouseleave', dragEnd);
slidesContainer.addEventListener('touchstart', touchStart);
slidesContainer.addEventListener('touchmove', touchMove);
slidesContainer.addEventListener('touchend', touchEnd);
slidesContainer.addEventListener('touchcancel', touchEnd);

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
    if (currentTranslate > prevTranslate && currentSlide > 0) {
      currentSlide--;
    } else if (currentTranslate < prevTranslate && currentSlide < slides.length - 1) {
      currentSlide++;
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
    if (currentTranslate > prevTranslate && currentSlide > 0) {
      currentSlide--;
    } else if (currentTranslate < prevTranslate && currentSlide < slides.length - 1) {
      currentSlide++;
    }
  }

  // Reset the current translate value
  currentTranslate = -currentSlide * slidesContainer.offsetWidth;
  setSlidePosition();
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSlidePosition() {
  slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
}

setSlidePosition();



  
  
  