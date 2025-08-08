document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector("header");

  // Hamburger toggle with null check
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }

  // Shrink header on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });

  // Smooth scroll and reveal correct section
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      const allSections = document.querySelectorAll('.package-section');

      if (targetSection) {
        e.preventDefault();
        allSections.forEach(section => section.classList.remove('active'));
        targetSection.classList.add('active');
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Optional: close mobile nav on link click
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
        }
      }
    });
  });

  // Default active section on load based on hash
  const allSections = document.querySelectorAll('.package-section');
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const targetSection = document.getElementById(hash);
    if (targetSection) {
      allSections.forEach(section => section.classList.remove('active'));
      targetSection.classList.add('active');
    }
  } else {
    // If no hash, show the first package section by default
    if (allSections.length) {
      allSections.forEach(section => section.classList.remove('active'));
      allSections[0].classList.add('active');
    }
  }
});
