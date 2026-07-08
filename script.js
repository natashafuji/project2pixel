// TODO: Add Meta Pixel ID here
// TODO: Add GA4 Measurement ID here
// TODO: Add Google Tag Manager ID here

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

const highlightProject2Pixel = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const textNodes = []

  while (walker.nextNode()) {
    const node = walker.currentNode
    if (!/Project\s*2\s*Pixel/.test(node.nodeValue)) continue

    const parent = node.parentElement
    if (!parent) continue
    if (parent.closest("script, style, title, meta")) continue
    if (parent.classList.contains("logo-text")) continue

    textNodes.push(node)
  }

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment()
    const pattern = /Project\s*2\s*Pixel/g
    const text = node.nodeValue
    let lastIndex = 0
    let match = pattern.exec(text)

    while (match) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
      }

      fragment.appendChild(document.createTextNode("Project"))

      const highlightedTwo = document.createElement("span")
      highlightedTwo.classList.add("brand-2")
      highlightedTwo.appendChild(document.createTextNode("2"))
      fragment.appendChild(highlightedTwo)

      fragment.appendChild(document.createTextNode("Pixel"))

      lastIndex = pattern.lastIndex
      match = pattern.exec(text)
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
    }

    node.parentNode.replaceChild(fragment, node)
  })
}

if (document.body) {
  highlightProject2Pixel()
}
