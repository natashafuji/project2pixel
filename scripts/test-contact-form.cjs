const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")

const contactPage = fs.readFileSync(path.join(__dirname, "../contact/index.html"), "utf8")
const form = contactPage.match(/<form\b[^>]*class="enquiry-form"[^>]*>[\s\S]*?<\/form>/)?.[0]

assert.ok(form, "Contact form is present")
assert.match(form, /action="https:\/\/formsubmit\.co\/info@project2pixel\.co\.za"/)
assert.match(form, /method="POST"/)
assert.match(form, /name="_next" value="https:\/\/project2pixel\.co\.za\/thank-you\.html"/)
assert.match(form, /name="_url" value="https:\/\/project2pixel\.co\.za\/contact\/"/)
assert.match(form, /name="_captcha" value="true"/)
assert.match(form, /name="_honey"/)

for (const field of ["name", "email", "service", "message"]) {
  assert.match(form, new RegExp(`(?:input|select|textarea)[^>]*name="${field}"[^>]*required`))
}
assert.match(form, /name="email" type="email"/)
assert.match(form, /name="phone" type="tel"/)
assert.match(contactPage, /href="mailto:info@project2pixel\.co\.za"/)
assert.match(contactPage, /href="https:\/\/calendly\.com\/project2pixel-info\/30min"/)
assert.doesNotMatch(contactPage, /formsubmit\.co\/ajax\//)
assert.doesNotMatch(contactPage, /contact-form\.js/)

console.log("Contact form static checks passed")
