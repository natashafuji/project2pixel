document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
  
      // Auto-close mobile menu on link click
      navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          if (navLinks.classList.contains("show")) {
            navLinks.classList.remove("show");
          }
        });
      });
    }
  
    // Shrink header on scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) header.classList.add("shrink");
      else header.classList.remove("shrink");
    });
  
    // Package section toggle logic
    const allPackages = document.getElementById('all-packages');
    if (!allPackages) return;
  
    function activateSection(id) {
      const allSections = allPackages.querySelectorAll(".package-section");
  
      if (id === 'all-packages') {
        allPackages.classList.add('active');         // Show container
        allSections.forEach(section => section.classList.add('active'));  // Show all packages
        allPackages.scrollIntoView({ behavior: "smooth" });
        return;
      }
  
      allPackages.classList.add('active');          // Show container
      allSections.forEach(section => {
        if (section.id === id) {
          section.classList.add('active');           // Show target section
        } else {
          section.classList.remove('active');        // Hide others
        }
      });
  
      const targetSection = document.getElementById(id);
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    }
  
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const targetID = link.getAttribute("href").substring(1);
      if (
        document.getElementById(targetID) &&
        (
          targetID === 'all-packages' ||
          targetID.endsWith('-packages') ||
          targetID === 'ngo-addons'
        )
      ) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          activateSection(targetID);
        });
      }
    });
  
    // Activate on page load if URL has hash
    const hash = window.location.hash.substring(1);
    if (
      hash &&
      document.getElementById(hash) &&
      (hash === 'all-packages' || hash.endsWith('-packages') || hash === 'ngo-addons')
    ) {
      activateSection(hash);
    }
  });
  
