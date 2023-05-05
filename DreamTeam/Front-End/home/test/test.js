function toggleCollapse(elementId, button) {
  const section = document.getElementById(elementId);
  const aboutUsSection = document.getElementById("aboutUsSection");

  if (section.style.maxHeight) {
    section.style.maxHeight = null;
    button.classList.remove("expanded");
  } else {
    section.style.maxHeight = section.scrollHeight + "px";
    button.classList.add("expanded");
  }

  // Update the height of the aboutUsSection
  updateAboutUsSectionHeight(button);
}

function updateAboutUsSectionHeight(aboutUsButton) {
  const aboutUsSection = document.getElementById("aboutUsSection");
  const subDropdowns = document.querySelectorAll(".sub-dropdown-content");

  let totalHeight = 0;

  subDropdowns.forEach((dropdown) => {
    if (dropdown.style.maxHeight) {
      totalHeight += parseInt(dropdown.style.maxHeight);
    }
  });

  // Check if the aboutUsButton is expanded
  if (aboutUsButton && aboutUsButton.classList.contains("expanded")) {
    // Add initial height value to accommodate the sub-dropdown buttons
    aboutUsSection.style.maxHeight = (totalHeight + subDropdowns.length * 70) + "px";
  } else {
    aboutUsSection.style.maxHeight = null;
  }
}

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
