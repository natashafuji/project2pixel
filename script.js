// TODO: Add Meta Pixel ID here
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

const serviceSelect = document.getElementById("service")

if (serviceSelect) {
  const requestedService = new URLSearchParams(window.location.search).get("service")
  let selectedService = ""

  switch (requestedService) {
    case "business-support":
      selectedService = "Executive & Business Support"
      break
    case "websites":
      selectedService = "Websites & Digital Presence"
      break
    case "crm-systems":
      selectedService = "CRM & Business Systems"
      break
    case "workflow-automation":
      selectedService = "Workflow & Automation"
      break
    case "digital-care":
      selectedService = "Website & Digital Care"
      break
  }

  if (selectedService) {
    serviceSelect.value = selectedService
  }
}


// Google Analytics loads only after the visitor accepts analytics cookies.
const ANALYTICS_ID = "G-PJ6ERE5BK4"
const ANALYTICS_CONSENT_KEY = "project2pixel_analytics_consent"

const getAnalyticsConsent = () => {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY)
  } catch {
    return null
  }
}

const setAnalyticsConsent = (value) => {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value)
  } catch {
    // Keep the visitor's choice for the current page when storage is unavailable.
  }
}

const loadGoogleAnalytics = () => {
  if (document.querySelector("script[data-project2pixel-analytics]")) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", ANALYTICS_ID, { anonymize_ip: true })

  const analytics = document.createElement("script")
  analytics.async = true
  analytics.dataset.project2pixelAnalytics = "true"
  analytics.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`
  document.head.appendChild(analytics)
}

const removeAnalyticsCookies = () => {
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}; SameSite=Lax`
    })
}

const showCookieBanner = () => {
  document.querySelector(".cookie-banner")?.remove()

  const banner = document.createElement("section")
  banner.className = "cookie-banner"
  banner.setAttribute("role", "dialog")
  banner.setAttribute("aria-label", "Analytics cookie preferences")
  banner.innerHTML = `
    <div>
      <strong>Your privacy choices</strong>
      <p>Project2Pixel would like to use Google Analytics to understand how visitors use this website. Analytics will only load if you accept. Read our <a href="/privacy.html">Privacy Policy</a>.</p>
    </div>
    <div class="cookie-actions">
      <button type="button" class="cookie-reject">Reject</button>
      <button type="button" class="cookie-accept">Accept analytics</button>
    </div>
  `

  banner.querySelector(".cookie-accept").addEventListener("click", () => {
    setAnalyticsConsent("accepted")
    loadGoogleAnalytics()
    banner.remove()
  })

  banner.querySelector(".cookie-reject").addEventListener("click", () => {
    setAnalyticsConsent("rejected")
    removeAnalyticsCookies()
    banner.remove()
  })

  document.body.appendChild(banner)
  banner.querySelector(".cookie-accept").focus()
}

const addCookieSettingsControl = () => {
  const footer = document.querySelector("footer")
  if (!footer || footer.querySelector(".cookie-settings")) return

  const button = document.createElement("button")
  button.type = "button"
  button.className = "cookie-settings"
  button.textContent = "Cookie settings"
  button.addEventListener("click", showCookieBanner)
  footer.appendChild(button)
}

const analyticsConsent = getAnalyticsConsent()
if (analyticsConsent === "accepted") {
  loadGoogleAnalytics()
} else if (analyticsConsent !== "rejected") {
  showCookieBanner()
}
addCookieSettingsControl()


// Consent-aware lead and CTA conversion tracking.
const trackAnalyticsEvent = (eventName, parameters = {}) => {
  if (getAnalyticsConsent() !== "accepted") return
  loadGoogleAnalytics()
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters)
  }
}

const enquiryForm = document.querySelector(".enquiry-form")
if (enquiryForm) {
  enquiryForm.addEventListener("submit", () => {
    try {
      sessionStorage.setItem("project2pixel_lead_submitted", "true")
    } catch {
      // The thank-you page will still work if session storage is unavailable.
    }
  })
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a")
  if (!link) return

  const href = link.getAttribute("href") || ""
  const label = link.textContent.trim().replace(/\s+/g, " ").slice(0, 100)

  if (href.startsWith("mailto:")) {
    trackAnalyticsEvent("contact_click", { contact_method: "email", link_text: label })
  } else if (href.includes("calendly.com")) {
    trackAnalyticsEvent("book_discovery_call", { link_text: label })
  } else if (href.startsWith("/contact")) {
    trackAnalyticsEvent("cta_click", { cta_destination: "contact", link_text: label })
  }
})

if (window.location.pathname.endsWith("/thank-you.html")) {
  let confirmedSubmission = false
  try {
    confirmedSubmission = sessionStorage.getItem("project2pixel_lead_submitted") === "true"
    if (confirmedSubmission) sessionStorage.removeItem("project2pixel_lead_submitted")
  } catch {
    confirmedSubmission = false
  }

  if (confirmedSubmission) {
    trackAnalyticsEvent("generate_lead", { method: "website_enquiry_form" })
  }
}
