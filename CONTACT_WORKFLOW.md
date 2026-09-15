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


## Lead qualification fields

The form captures the prospect's requested service plus three optional qualification fields:

- ideal start date
- estimated budget range
- referral source

Keep these optional so early-stage prospects can still enquire. Use them to prioritise urgent, well-aligned opportunities and measure which channels generate qualified leads.

## Conversion events

Google Analytics runs only after analytics consent. The website records:

- `generate_lead` after a real form submission reaches the thank-you page
- `book_discovery_call` when a visitor opens Calendly
- `contact_click` for email links
- `cta_click` for links leading to the contact page

In GA4, mark `generate_lead` and `book_discovery_call` as key events. Review event counts after testing with analytics consent accepted.

## Recommended CRM pipeline

1. **New enquiry** — create a lead record with name, organisation, contact details, service, timeframe, budget, referral source and message.
2. **Acknowledged** — send confirmation immediately and create an owner follow-up task due within one business day.
3. **Qualified** — confirm fit, urgency, decision-maker, budget and desired outcome.
4. **Discovery booked** — record call date, requirements, constraints and next action.
5. **Proposal sent** — record value, service/package, sent date, expiry date and follow-up date.
6. **Won / onboarding** — record acceptance and payment status, then trigger the relevant onboarding checklist.
7. **Lost** — record a reason such as timing, budget, no response or poor fit.
8. **Nurture** — set a specific future follow-up date for suitable leads that are not ready now.

Minimum automation: website form → acknowledgement → CRM lead with source → owner notification → follow-up task. A later phase can automate proposals, reminders, payments and onboarding after the tools and commercial rules are confirmed.

## Proof and reputation safeguards

Only publish testimonials, results and case studies with the client's written approval. Record the approved quote, name/title display preference, logo permission, measurable outcome and approval date. Do not invent performance figures or imply a client relationship without permission.

For Google Business Profile and Google Search Console, use a Project2Pixel-owned business Google account and give trusted administrators their own access. Avoid sharing passwords.
