const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

if (hamburger && navLinks) {
  const setExpandedState = (isExpanded) => {
    hamburger.setAttribute("aria-expanded", String(isExpanded))
  }

  const closeMenu = () => {
    navLinks.classList.remove("open")
    setExpandedState(false)
  }

  const toggleMenu = () => {
    navLinks.classList.toggle("open")
    setExpandedState(navLinks.classList.contains("open"))
  }

  hamburger.addEventListener("click", toggleMenu)

  document.addEventListener("click", (e) => {
    const clickedInside = navLinks.contains(e.target) || hamburger.contains(e.target)
    if (!clickedInside) closeMenu()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu()
  })
}
