

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