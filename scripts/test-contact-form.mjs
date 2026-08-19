import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import vm from "node:vm"

const script = await readFile(new URL("../script.js", import.meta.url), "utf8")
const formHandler = `const enquiryForm =${script.split("const enquiryForm =")[1]}`

const submitWithResponse = async (success, responseOk = true) => {
  const status = { className: "", focusCalled: false, focus() { this.focusCalled = true } }
  const submitButton = { disabled: false }
  const serviceSelect = { value: "" }
  let submit

  const form = {
    action: "https://formsubmit.co/info@project2pixel.co.za",
    addEventListener: (_event, handler) => { submit = handler },
    querySelector: (selector) => {
      if (selector.includes("status")) return status
      if (selector.includes("button")) return submitButton
      return serviceSelect
    },
    reportValidity: () => true,
    reset: () => {},
  }

  const context = {
    AbortController,
    FormData: class FormData {},
    URL,
    URLSearchParams,
    document: { querySelector: () => form },
    fetch: async (url) => {
      assert.equal(url.href, "https://formsubmit.co/ajax/info@project2pixel.co.za")
      return { ok: responseOk, json: async () => ({ success }) }
    },
    window: {
      clearTimeout,
      location: { search: "?service=crm-systems" },
      setTimeout,
    },
  }

  vm.runInNewContext(formHandler, context)
  await submit({ preventDefault() {} })

  return { serviceSelect, status, submitButton }
}

const delivered = await submitWithResponse("true")
assert.match(delivered.status.className, /success/)
assert.equal(delivered.status.focusCalled, true)
assert.equal(delivered.serviceSelect.value, "CRM & Business Systems")
assert.equal(delivered.submitButton.disabled, false)

for (const providerResult of ["false", false, undefined]) {
  const failed = await submitWithResponse(providerResult)
  assert.match(failed.status.className, /error/)
  assert.equal(failed.status.focusCalled, true)
  assert.equal(failed.submitButton.disabled, false)
}

const httpFailure = await submitWithResponse("true", false)
assert.match(httpFailure.status.className, /error/)

console.log("Contact form handler checks passed")
