# Contact enquiry workflow

The contact form posts structured enquiry data to FormSubmit's documented AJAX endpoint for delivery to `info@project2pixel.co.za`. FormSubmit's `/el/danilu` URL is an Email Link, not an AJAX form token, so it is intentionally not used as a submission endpoint. The business email address is already public as the direct contact fallback; no inbox credentials or private secrets are exposed.

`contact-form.js` submits name, email, company, phone, service and message fields. A successful HTTP status alone is insufficient: the UI displays success only when FormSubmit also returns an explicit `success` value of boolean `true` or string `"true"`. Rejected, false, missing, malformed and timed-out responses display the failure state.

## Security and spam controls

The form uses native browser validation, FormSubmit's CAPTCHA setting and a honeypot field. The delivery URL is a fixed trusted endpoint rather than a DOM-derived fetch target. No passwords, API keys, inbox credentials or private secrets are stored in the repository or sent to the browser.

Run `node scripts/test-contact-form.cjs` after changing the form handler. The dependency-free check imports the handler directly and exercises successful delivery, provider-declared failures, malformed responses, HTTP failures and service preselection. It does not dynamically evaluate source code.

## Replacing the delivery service later

The form `action` and `initialiseEnquiryForm` in `contact-form.js` are the integration points for a future server endpoint, CRM, database or automation platform. Keep the existing field names when replacing the delivery target so downstream mapping remains straightforward.
