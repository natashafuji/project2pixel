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

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu)
  })

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


const currentYear = document.getElementById("currentYear")
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear())
}

const enquiryForm = document.querySelector("[data-enquiry-form]")

if (enquiryForm) {
  const status = enquiryForm.querySelector("[data-form-status]")
  const submitButton = enquiryForm.querySelector('button[type="submit"]')
  const serviceSelect = enquiryForm.querySelector("#service")
  const serviceMap = {
    "business-support": "Executive & Business Support",
    websites: "Websites & Digital Presence",
    "crm-systems": "CRM & Business Systems",
    "workflow-automation": "Workflow & Automation",
    "digital-care": "Website & Digital Care",
  }
  const requestedService = new URLSearchParams(window.location.search).get("service")
  if (serviceMap[requestedService]) serviceSelect.value = serviceMap[requestedService]

  enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (!enquiryForm.reportValidity()) return

    submitButton.disabled = true
    status.className = "form-status"
    status.textContent = "Sending your enquiry…"

    const deliveryUrl = new URL(enquiryForm.action)
    deliveryUrl.pathname = `/ajax${deliveryUrl.pathname}`
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(deliveryUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(enquiryForm),
        signal: controller.signal,
      })
      const result = await response.json().catch(() => ({}))
      const wasDelivered = result.success === true || result.success === "true"
      if (!response.ok || !wasDelivered) throw new Error("Delivery failed")

      enquiryForm.reset()
      status.className = "form-status success"
      status.textContent = "Thank you. Your enquiry has been received and we'll be in touch."
      status.focus()
    } catch {
      status.className = "form-status error"
      status.textContent = "We couldn't send your enquiry right now. Please contact us directly by email instead."
      status.focus()
    } finally {
      window.clearTimeout(timeout)
      submitButton.disabled = false
    }
  })
}
