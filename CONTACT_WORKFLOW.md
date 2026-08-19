# Contact enquiry workflow

Website form → standard HTTPS POST to FormSubmit → FormSubmit delivers enquiry to `info@project2pixel.co.za` → successful submission redirects to Project2Pixel thank-you page.

The Contact form uses its HTML `action` and `method` directly. AJAX is no longer used, and no client-side FormSubmit success parsing is required. FormSubmit redirects a successful submission to `https://project2pixel.co.za/thank-you.html` using the form's `_next` field.

## Security and spam controls

The form uses native browser validation, FormSubmit's CAPTCHA setting, and a honeypot field. No FormSubmit API keys are stored, and no inbox credentials, passwords, or private secrets are exposed in the repository or browser.

## Visitor alternatives

The Contact page retains two alternatives to the website form:

- a direct email link to `info@project2pixel.co.za`
- the Calendly discovery-call link at `https://calendly.com/project2pixel-info/30min`

## Verification

Run `node scripts/test-contact-form.cjs` after changing the Contact form. This dependency-free static check verifies the standard FormSubmit action and POST method, redirect and source URL fields, CAPTCHA and honeypot settings, required enquiry fields, and the email and Calendly fallbacks.
