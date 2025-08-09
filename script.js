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

  // ====== START: Package Section Activation Code (only if packages exist) ======
  const allPackages = document.getElementById('all-packages');
  if (allPackages) {
    // Function to activate package sections by ID
    function activateSection(id) {
      const allSections = allPackages.querySelectorAll(".package-section");

      console.log('activateSection called with id:', id);
      console.log('allPackages:', allPackages);
      console.log('allSections count:', allSections.length);

      if (id === 'all-packages') {
        allPackages.style.display = 'block';
        allSections.forEach(section => {
          section.style.display = 'block';
          section.classList.remove('active');
        });
        allPackages.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // For individual package section clicks:
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

    // Listen for all anchor links to package sections with proper filtering
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

    // On page load, activate the section if hash matches and is in packages
    const hash = window.location.hash.substring(1);
    if (
      hash &&
      document.getElementById(hash) &&
      (hash === 'all-packages' || hash.endsWith('-packages') || hash === 'ngo-addons')
    ) {
      activateSection(hash);
    }
  }
  // ====== END: Package Section Activation Code ======
});
