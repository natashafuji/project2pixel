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
    const allPackages = document.getElementById('all-packages');
    const allSections = allPackages.querySelectorAll(".package-section");

    if (id === 'all-packages') {
      // Show all packages container and all package sections inside it
      allPackages.style.display = 'block';
      allSections.forEach(section => {
        section.style.display = 'block';
        section.classList.remove('active');
      });
      allPackages.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // For individual package section clicks:
    if (allPackages) {
      allPackages.style.display = 'block';  // Show container
      allSections.forEach(section => {
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

  // === NEW CODE: Show all packages when Explore Services & Pricing button clicked ===
  // (This is now handled inside activateSection, so this can be omitted or left for redundancy)
  /*
  const allPackages = document.getElementById('all-packages');
  const exploreBtn = document.querySelector('a[href="#all-packages"]');

  if (allPackages && exploreBtn) {
    allPackages.style.display = 'none';

    exploreBtn.addEventListener('click', e => {
      e.preventDefault();
      allPackages.style.display = 'block';
      allPackages.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll(".package-section").forEach(s => s.classList.remove("active"));
    });
  }
  */
});
