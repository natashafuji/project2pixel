// Wait until the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  // Toggle navigation menu on mobile
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  // Shrink header on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  // Shrink header on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // Scroll and toggle sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});





