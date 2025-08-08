<script>
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

  // Activate section by ID and scroll smoothly
  function activateSection(id) {
    const targetSection = document.getElementById(id);
    const allSections = document.querySelectorAll(".package-section");
    if (targetSection) {
      allSections.forEach(s => s.classList.remove("active"));
      targetSection.classList.add("active");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Listen for all anchor links to package sections
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href").substring(1);
      if (document.getElementById(targetID)) {
        e.preventDefault();
        activateSection(targetID);
      }
    });
  });

  // On page load, activate the section if hash matches
  const hash = window.location.hash.substring(1);
  if (document.getElementById(hash)) {
    activateSection(hash);
  }
});
</script>
