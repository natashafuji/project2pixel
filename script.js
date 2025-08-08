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

  // Smooth scroll + reveal correct section
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
      }
    });
  });

  // Default active section when page loads via hash
  if (window.location.hash === "#all-packages") {
    const allPackages = document.getElementById("all-packages");
    if (allPackages) {
      allPackages.classList.add("active");
    }
  }
});
