EcoReach Foundation Web Application (WEDE5020 POE Part 1, Part 2 & Part 3)

Welcome to the official web repository for the EcoReach Foundation digital platform. This website was created as part of the WEDE5020 Module Portfolio of Evidence (PoE) submission.

EcoReach Foundation is a South African non-profit organization (NPO) dedicated to urban environmental conservation, community recycling initiatives, and youth sustainability education.

📋 Student & Project Details

Project Title: Website Development Project for EcoReach Foundation

Module Code: WEDE5020

Student Name: Okuhle Ntantiso

Student Number: ST10538718

Academic Year: 2026

Live GitHub Repository: PROG-ASSIGNMENT

🌐 Website Architecture & Sitemap

The website contains six HTML pages, including a separate enquiry page, structured with semantic tags and responsive design patterns:

index.html (Home):

Features a hero banner with primary call-to-actions (CTAs).

Overview of core mission and highlights of focus areas (Recycling, Cleanups, Youth Education).

about.html (About Us):

Details the organization's history (founded in 2021), Mission, and Vision statements.

Outlines primary target audiences (Residents, Schools, Corporate Sponsors).

services.html (Services & Initiatives):

Highlights core initiatives: Community Recycling Workshops, Urban Cleanup Operations, Youth Education, and Corporate Sustainability Consulting.

donations.html (Donations):

Provides direct bank transfer details (EFT).

Features an interactive pledge form for one-time or recurring contributions.

enquiry.html (Enquiries):

Allows visitors to ask about services, volunteering and sponsorship, and displays relevant guidance about availability and costs.

contact.html (Contact Us):

Displays primary contact channels, physical address, and operating hours.

Features an accessible client query/message submission form.

🎨 Design & Styling Specifications (styles.css)

The project adheres to modern Web Content Accessibility Guidelines (WCAG 2.1) and user experience standards:

Color Palette:

Primary: Forest Green (#2E7D32) — Represents growth and environmental sustainability.

Accent: Sage Green (#81C784) — Used for interactive elements and active navigation indicators.

Background: Neutral Light Grey (#F9F9F9) — Ensures reduced visual glare and high contrast.

Typography Text: Charcoal (#212121) — Satisfies readability and high-contrast standards.

Typography:

Modern sans-serif stack (Aptos, Open Sans, Arial).

Layout Techniques:

CSS Grid (grid-2, grid-3) and Flexbox layout models.

Mobile-first media queries (@media screen and (max-width: 768px)).

Sticky header navigation (position: sticky).

📂 Folder & Directory Structure

ecoreach-poe/
├── styles.css        # Main CSS stylesheet containing all site styles
├── index.html        # Homepage
├── about.html        # Foundation background, mission & vision
├── services.html     # Community initiatives & services
├── donations.html    # EFT banking info & donation pledge form
├── enquiry.html     # Services, volunteer and sponsor enquiry form
├── contact.html      # Multi-channel contact details & inquiry form
├── site.js           # Shared image lightbox and site interactions
├── enquiry.js        # Enquiry validation and dynamic response
├── robots.txt        # Search crawler instructions
├── sitemap.xml       # Search engine sitemap
└── README.md         # Project documentation file


🛠️ Getting Started & Installation

Clone the Repository:

git clone https://github.com/okuhlentantiso64/PROG-ASSIGNMENT.git


Open the Project:

Navigate into the project folder.

Open index.html in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

📚 References & Standards

W3C (2026): Web Content Accessibility Guidelines (WCAG) 2.1 Overview. Available at: https://www.w3.org/WAI/standards-guidelines/wcag/

Mozilla Developer Network (MDN) (2025): Structuring the Web: HTML & CSS Basics. Available at: https://developer.mozilla.org/

EcoReach Foundation (2026): Community Outreach & Environmental Impact Profile. Cape Town: EcoReach NPC.

Image Assets: High-resolution photography royalty-free via Unsplash.


## Part 3 — Enhancing Functionality and SEO

### JavaScript functionality added
- Added a shared `site.js` file to provide a reusable image lightbox. Gallery images can be opened by mouse click or keyboard (Enter/Space), and closed with the close button, outside click or Escape key.
- Added an FAQ accordion on the About page using HTML `details` and `summary` elements.
- Kept the existing service search/filter and donation pledge interactions.
- Added `enquiry.js` to validate enquiry details and display a response based on whether the visitor selected a service, volunteering or sponsorship enquiry.
- Updated `contact.js` to validate the contact form and prepare an email using a `mailto:` link. The visitor's default email application opens; the visitor must review and press Send. This method does not send email automatically.

### Forms
- `enquiry.html` collects contact details, enquiry type, programme and message. JavaScript validates the form and displays relevant next-step information about availability and applicable costs.
- `contact.html` collects the sender's name, email, message type, subject and message. After validation, the browser opens an email draft addressed to `info@ecoreach.org.za`.

### SEO improvements
- Added a descriptive page title, meta description and keywords to each HTML page.
- Kept descriptive headings, image alternative text and internal navigation links.
- Added `robots.txt` and `sitemap.xml`. IMPORTANT: replace `https://YOUR-NETLIFY-SITE.netlify.app` in both files with the real published Netlify domain before final deployment.

### Changelog

| Date | Changes |
|---|---|
| 02 November 2026 | Added SEO titles, descriptions and keywords to the website pages. |
| 02 November 2026 | Added a dedicated enquiry page with client-side validation and dynamic responses. |
| 02 November 2026 | Updated contact form to validate details and prepare a `mailto:` email draft. |
| 02 November 2026 | Added an accessible image lightbox and FAQ accordion. |
| 02 November 2026 | Added `robots.txt` and `sitemap.xml`; sitemap domain must be updated after deployment. |
| 02 November 2026 | Added Part 3 documentation and references to this README. |

### References (Part 3)
- MDN Web Docs (n.d.) *HTML forms*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms (Accessed: 2 November 2026).
- MDN Web Docs (n.d.) *Constraint validation*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation (Accessed: 2 November 2026).
- MDN Web Docs (n.d.) *The `mailto` URL scheme*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#linking_to_an_email_address (Accessed: 2 November 2026).
- Google Search Central (n.d.) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 2 November 2026).
- Google Search Central (n.d.) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 2 November 2026).

### Final publishing checklist
1. Replace the placeholder Netlify domain in `robots.txt` and `sitemap.xml`.
2. Test all navigation links, search, forms and the image lightbox in a browser.
3. Confirm the email application opens from the Contact form and test by sending a message only if appropriate.
4. Commit and push all updated files to GitHub.
5. Deploy the complete project folder to Netlify.
6. Submit the GitHub repository link and published website URL as required by the lecturer.
