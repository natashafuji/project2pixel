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


## Case study intake

Prepare one case study at a time. InstantDesk and Hephzibah are possible candidates, but publish nothing until each client confirms the relationship and approves the final wording.

Collect:

- the client's approved display name and logo
- the original challenge in the client's own words
- the work Project2Pixel actually delivered
- one to three verified outcomes, with dates or baseline context where relevant
- an approved quotation and the person's name/title display preference
- written approval for the final page, logo and links

Use the structure: **Challenge → Approach → Deliverables → Verified outcome → Client quotation → Relevant service CTA**. If an outcome cannot be measured, describe the concrete operational change without adding a percentage or unsupported claim.

## Testimonial request process

Ask shortly after a successful milestone or handover. Make the request easy to answer:

1. What problem were you trying to solve?
2. What was it like working with Project2Pixel?
3. What changed after the work was completed?
4. May Project2Pixel publish your response, name, role, organisation and logo?

Send the edited quotation back for explicit approval before publishing it. Keep a record of the approval and do not offer incentives in exchange for a positive Google review.

## Google Business Profile eligibility and setup

First confirm eligibility. Google currently permits profiles for businesses with a customer-facing physical location or businesses that travel to customers. If Project2Pixel operates only online and never meets clients at their locations, do not create a profile. If Project2Pixel travels to clients, configure it as a service-area business and hide the residential address.

If eligible:

1. Sign in with the Project2Pixel business Google account and add or claim one profile named exactly **Project2Pixel**.
2. Use the real operating address for verification, hide it from customers if it is a service-area business, and add only accurate service areas.
3. Select the fewest accurate categories available in Google's current list; choose the primary category based on the main revenue-generating service.
4. Add `https://www.project2pixel.co.za/`, a business-controlled phone number, customer-facing hours, services, logo and genuine work images.
5. Complete Google's offered verification method and keep ownership in the business account. Add other people as managers instead of sharing a password.
6. After successful projects, use the profile's review link to request honest reviews without incentives. Reply professionally to every genuine review.

Official guidance: https://support.google.com/business/answer/3038177 and https://support.google.com/business/answer/2911778

## Google Search Console setup

Use a **Domain property** for `project2pixel.co.za` so reporting includes HTTPS, HTTP, www and non-www versions.

1. Open https://search.google.com/search-console and choose **Add property → Domain**.
2. Enter `project2pixel.co.za` without `https://` or `www`.
3. Copy the Google verification TXT value and add it to the domain's DNS at the root host. Do not remove existing MX, SPF, DKIM, DMARC, A or CNAME records.
4. After DNS propagation, click **Verify**. Leave the TXT record in place so ownership remains valid.
5. Open **Sitemaps**, submit `https://www.project2pixel.co.za/sitemap.xml`, and confirm that it is accepted.
6. Inspect the home page and key service URLs, then request indexing only if needed.
7. Review Performance monthly: queries, pages, countries, devices, clicks, impressions, click-through rate and average position. Turn useful search queries into clearer page copy or genuinely helpful new content.
8. Give collaborators their own Search Console access; do not share the business Google password.

Google notes that Search Console data can take a few days to appear. Official guidance: https://support.google.com/webmasters/answer/34592 and https://support.google.com/webmasters/answer/7451001
