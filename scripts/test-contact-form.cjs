const assert = require("node:assert/strict")
const { initialiseEnquiryForm } = require("../contact-form.js")

const submitWithResponse = async ({ success, responseOk = true, malformedJson = false } = {}) => {
  const status = { className: "", focusCalled: false, focus() { this.focusCalled = true } }
  const submitButton = { disabled: false }
  const serviceSelect = { value: "" }
  let submit
  let requestedUrl
  const form = {
    addEventListener: (_event, handler) => { submit = handler },
    querySelector: (selector) => selector.includes("status") ? status : selector.includes("button") ? submitButton : serviceSelect,
    reportValidity: () => true,
    reset: () => {},
  }
  const fetchRef = async (url) => ({
    ok: responseOk,
    json: async () => {
      requestedUrl = url
      if (malformedJson) throw new SyntaxError("Invalid JSON")
      return { success }
    },
  })
  initialiseEnquiryForm({
    documentRef: { querySelector: () => form },
    windowRef: { clearTimeout, location: { search: "?service=crm-systems" }, setTimeout },
    fetchRef,
    FormDataRef: class FormData {},
    AbortControllerRef: AbortController,
  })
  await submit({ preventDefault() {} })
  return { requestedUrl, serviceSelect, status, submitButton }
}

const main = async () => {
  for (const success of [true, "true"]) {
    const delivered = await submitWithResponse({ success })
    assert.equal(delivered.requestedUrl, "https://formsubmit.co/ajax/info@project2pixel.co.za")
    assert.match(delivered.status.className, /success/)
    assert.equal(delivered.serviceSelect.value, "CRM & Business Systems")
    assert.equal(delivered.submitButton.disabled, false)
  }
  for (const success of ["false", false, undefined, null, 1]) {
    const failed = await submitWithResponse({ success })
    assert.match(failed.status.className, /error/)
    assert.equal(failed.status.focusCalled, true)
    assert.equal(failed.submitButton.disabled, false)
  }
  assert.match((await submitWithResponse({ success: "true", responseOk: false })).status.className, /error/)
  assert.match((await submitWithResponse({ malformedJson: true })).status.className, /error/)
  console.log("Contact form handler checks passed")
}
main().catch((error) => { console.error(error); process.exitCode = 1 })
