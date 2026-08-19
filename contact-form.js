const FORM_SUBMIT_AJAX_ENDPOINT = "https://formsubmit.co/ajax/info@project2pixel.co.za"

const initialiseEnquiryForm = ({
  documentRef = document,
  windowRef = window,
  fetchRef = fetch,
  FormDataRef = FormData,
  AbortControllerRef = AbortController,
} = {}) => {
  const enquiryForm = documentRef.querySelector("[data-enquiry-form]")
  if (!enquiryForm) return

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
  const requestedService = new URLSearchParams(windowRef.location.search).get("service")
  if (serviceMap[requestedService]) serviceSelect.value = serviceMap[requestedService]

  enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (!enquiryForm.reportValidity()) return

    submitButton.disabled = true
    status.className = "form-status"
    status.textContent = "Sending your enquiry…"

    const controller = new AbortControllerRef()
    const timeout = windowRef.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetchRef(FORM_SUBMIT_AJAX_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormDataRef(enquiryForm),
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
      windowRef.clearTimeout(timeout)
      submitButton.disabled = false
    }
  })
}

if (typeof document !== "undefined") initialiseEnquiryForm()
if (typeof module !== "undefined") module.exports = { initialiseEnquiryForm }
