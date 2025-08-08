document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }

  // Auto-close mobile menu on nav link click
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
        }
      });
    });
  }

  // Shrink header on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) header.classList.add("shrink");
    else header.classList.remove("shrink");
  });

  // Handle 'Explore Services & Pricing' button (and any link to #all-packages)
  function activateAllPackages() {
    const targetSection = document.getElementById("all-packages");
    const allSections = document.querySelectorAll(".package-section");
    if (targetSection) {
      allSections.forEach(s => s.classList.remove("active"));
      targetSection.classList.add("active");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.querySelectorAll('a[href="#all-packages"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      activateAllPackages();
    });
  });

  // Show #all-packages if URL hash matches on load
  if (window.location.hash === "#all-packages") {
    const ap = document.getElementById("all-packages");
    if (ap) ap.classList.add("active");
  }
});
