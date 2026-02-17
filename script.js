(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  const setExpanded = (isOpen) => {
    hamburger.setAttribute("aria-expanded", String(isOpen));
  };

  const openMenu = () => {
    navLinks.classList.add("open");
    hamburger.classList.add("open");
    setExpanded(true);
  };

  const closeMenu = () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    setExpanded(false);
  };

  const toggleMenu = () => {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  };

  hamburger.addEventListener("click", toggleMenu);

  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
    if (e.key === "Escape") closeMenu();
  });

  navLinks.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") closeMenu();
  });

  document.addEventListener("click", (e) => {
    const clickedInside = navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
