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
