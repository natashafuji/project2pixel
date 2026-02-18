const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

if (hamburger && navLinks) {
  const toggleMenu = () => {
    navLinks.classList.toggle("open")
  }

  hamburger.addEventListener("click", toggleMenu)

  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleMenu()
  })

  document.addEventListener("click", (e) => {
    const clickedInside = navLinks.contains(e.target) || hamburger.contains(e.target)
    if (!clickedInside) navLinks.classList.remove("open")
  })
}
