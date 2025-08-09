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

  // Hide all package sections initially inside all-packages container
  const allPackages = document.getElementById('all-packages');
  if (allPackages) {
    const allSections = allPackages.querySelectorAll(".package-section");
    allSections.forEach(section => {
      section.style.display = 'none';
      section.classList.remove('active');
    });
  }

  // Activate section by ID and scroll smoothly
  function activateSection(id) {
    if (id === 'all-packages') {
      // Show all packages container and all package sections inside it
      if (allPackages) {
        allPackages.style.display = 'block';
        allPackages.querySelectorAll(".package-section").forEach(section => {
          section.style.display = 'block';
          section.classList.remove('active');
        });
        allPackages.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // For individual package section clicks:
    if (allPackages) {
      allPackages.style.display = 'block';  // Show container
      allPackages.querySelectorAll(".package-section").forEach(section => {
        if (section.id === id) {
          section.style.display = 'block';
          section.classList.add('active');
        } else {
          section.style.display = 'none';
          section.classList.remove('active');
        }
      });
      const targetSection = document.getElementById(id);
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
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
