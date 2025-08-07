
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger?.addEventListener("click", function () {
    navLinks?.classList.toggle("show");
  });
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
});

[...document.body.querySelectorAll('*')].forEach(el => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log('Overflowing Element:', el);
  }
});

