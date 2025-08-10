document.addEventListener("DOMContentLoaded", function () {
  // ----- HAMBURGER TOGGLE (works on all pages) -----
  const burger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const nav = document.getElementById('navLinks') || document.querySelector('.nav-links') || document.querySelector('nav ul');

  if (burger && nav) {
    function toggle() {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    burger.addEventListener('click', toggle);
    burger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // ----- ALL-PACKAGES SHOW/HIDE + SMOOTH SCROLL -----
  const header = document.querySelector("header");
  const allPackages = document.getElementById('all-packages');

  function smoothScrollTo(el) {
    if (!el) return;
    const headerH = header ? header.offsetHeight : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 20);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function activateSection(id) {
    if (!allPackages) return;
    const sections = allPackages.querySelectorAll(".package-section");
    allPackages.classList.add("active");

    if (id === "all-packages") {
      sections.forEach(s => s.classList.add("active"));
      const topH2 = document.querySelector('#bundle-packages h2') || allPackages;
      smoothScrollTo(topH2);
      return;
    }

    sections.forEach(s => s.classList.toggle("active", s.id === id));
    const targetHeading = document.querySelector(`#${id} h2`);
    smoothScrollTo(targetHeading || allPackages);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    if (document.getElementById(id) && (id === "all-packages" || id.endsWith("-packages") || id === "ngo-addons" || id === "bundle-packages")) {
      link.addEventListener("click", e => { e.preventDefault(); activateSection(id); });
    }
  });

  const initial = window.location.hash.slice(1);
  if (initial && document.getElementById(initial) && (initial === "all-packages" || initial.endsWith("-packages") || initial === "ngo-addons" || initial === "bundle-packages")) {
    setTimeout(() => activateSection(initial), 0);
  }
});
