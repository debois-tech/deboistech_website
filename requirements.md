# deboistech Website — Requirements (Phase 1: Front Page)

## Scope

- Static website, front-end only, no backend.
- Basic routing only (nav links route to pages/sections; no dropdown menus, no auth, no forms wired to a backend yet).
- This phase: build the **home/front page only**. Other routed pages (Services, Product, About, Blogs) are out of scope for now — nav links can point to placeholder routes.
- Colors and fonts are TBD — user will provide later. Use a placeholder theme for now (green accent based on logo, as seen in mockups).
- All images marked "placeholder" below are literal placeholders (gray box / icon) until the user supplies final assets.

## Layout Rule (applies globally)

- Each section is a **distinct, self-contained block** — no two sections should visually bleed into each other (clear separation via background color change, spacing, or border).
- Sections stack vertically; user scrolls from one to the next.

## Global Look & Feel (across all sections)

- **Palette (placeholder until real codes given):** brand green as the single accent color (buttons, links, icons, highlighted words in headings); backgrounds are white or very light gray/off-white for every section except the footer, which is a dark background tinted toward the brand green (not plain black).
- **Typography:** bold, large sans-serif headings; part of many headings is highlighted in the accent green (e.g. "Empowering Futures.", "Real Impact", "Together"); body/subtext is a muted gray, smaller size; small "eyebrow" labels (e.g. "FEATURED PRODUCT", "OUR TEAM & CULTURE", "LET'S WORK TOGETHER") appear as small-caps or bold uppercase tags above headings.
- **Buttons:** primary CTA = solid green, pill/rounded-rectangle, white text, trailing arrow (→) or play icon; secondary CTA = white/outline button with border, same rounded shape.
- **Cards:** white background, soft drop shadow or thin border, rounded corners (~8–12px), consistent internal padding, icon or image at top, bold title, gray description, green link/checkmarks.
- **Icons/checkmarks:** green circular badges or green checkmark icons used consistently across feature lists.
- **Spacing:** generous vertical padding between sections so each section feels contained (reinforces the "no bleed" rule); consistent max-width content container centered on the page with side margins/gutters.

## Section-by-Section Breakdown

### 1. Nav Bar + Hero (single section, hero sits right below nav bar)

**Nav bar:**

- Logo far left — placeholder until user provides asset.
- Nav items (routing only, **no dropdowns**):
  - Services
  - Product
  - About
  - Blogs
  - Let's Talk (CTA button, with arrow icon)
- **Look:** white background bar, fixed/sticky to top of viewport, thin bottom border or subtle shadow to separate it from the hero below; logo far left, nav links evenly spaced center-right in medium-weight gray/dark text; "Let's Talk" rendered as the solid green pill CTA button with arrow, distinct from the plain-text nav links.

**Hero (main):**

- Headline: "Building Solutions. Empowering Futures."
- Subtext: "We build scalable software, AI solutions, and cloud-native products that help businesses innovate, grow, and lead in the digital era."
- Two CTAs: "Explore Our Services →" (primary/filled) and "View Our Work ▶" (secondary/outline)
- Social proof line: avatar icons + "Trusted by startups and enterprises worldwide"
- Right side: image placeholder (isometric illustration in final design; placeholder box for now)
- **Look:** left-aligned two-column layout (text left, image right); light/white background, optionally a very faint dot-grid or gradient texture behind the illustration; headline spans two lines, second line ("Empowering Futures.") in the accent green while the first line stays dark/black; subtext in muted gray below headline; the two CTA buttons sit side-by-side with visible spacing; small overlapping avatar circles + gray trust text sit below the buttons; right-side illustration is isometric-style stacked cube/block graphics with green accents floating over a laptop graphic, placeholder box for now.

### 2. Trusted Technologies (tech stack marquee)

- Centered title: "Trusted Technologies"
- Centered subtext: "We use modern, reliable and secure technologies to build scalable solutions for the future."
- Auto-scrolling marquee of tech logos: AWS, Kubernetes, Docker, React, Node.js, Python, PostgreSQL, GitHub
- Logos + labels beneath each icon
- **Look:** full-width section, white or very light-gray background, heading and subtext centered and stacked; below that, a small uppercase gray label ("TRUSTED BY INNOVATIVE COMPANIES") over a first marquee row of larger, evenly-spaced grayscale/monochrome company logos scrolling continuously left-to-right; a second marquee row (the actual tech stack: AWS, Kubernetes, Docker, React, Node.js, Python, PostgreSQL, GitHub) shown as colorful icon + small gray label underneath each, evenly spaced, housed in a rounded light-gray/white "shelf" card with a soft shadow so it visually separates from the plain background; both rows scroll independently and continuously (infinite loop, no visible start/end).

### 3. Featured Product — TenantPlane

- Two-column layout: image/screenshot on left (placeholder for now), content on right
- Eyebrow label: "FEATURED PRODUCT"
- Title: "TenantPlane"
- Description: "A Kubernetes management platform built to simplify cluster provisioning, monitoring, deployment, and operations across cloud environments."
- Feature checklist (2 columns):
  - Cluster Management / RBAC & Access Control
  - Multi Cloud Ready / Monitoring & Alerts
  - Deployment Automation / Developer Friendly
- CTA: "Explore TenantPlane →"
- Footnote: "Built entirely by deboistech Engineering."
- **Look:** light background section; left column is a dark-themed dashboard screenshot (product UI mockup) inside a rounded, bordered frame with soft shadow — placeholder box for now; right column starts with a small green pill-shaped "FEATURED PRODUCT" eyebrow badge, then a large bold title with "Plane" portion of "TenantPlane" colored green (or similar partial-green treatment), then gray paragraph text, then the feature checklist arranged as a 2-column grid with green checkmark icons beside each item, then the green pill CTA button with arrow, and a small italic/light-gray footnote line at the very bottom.

### 4. What We Do / Solutions

- Title: "Solutions That Drive Real Impact"
- Subtext: "From cloud infrastructure to intelligent applications, we build scalable, secure and future-ready solutions tailored to your business."
- 4-column card grid, each with icon, title, description, checklist, "Learn More →":
  1. **Cloud Engineering** — Scalable, secure and cost-efficient cloud solutions on AWS, Azure and GCP. (Cloud Architecture, DevOps & Automation, Infrastructure as Code, Cloud Migration)
  2. **AI Solutions** — AI-powered applications and automation that unlock insights and boost productivity. (LLM Integration, Intelligent Automation, Data Analytics, Custom AI Models)
  3. **Enterprise Applications** — Robust and secure enterprise software to streamline operations and scale your business. (Web Applications, API Development, Microservices, System Integration)
  4. **Product Engineering** — End-to-end product development from idea validation to launch and beyond. (Product Strategy, UI/UX Design, Agile Development, Product Support)
- **Look:** white background, heading and subtext centered at top with "Real Impact" highlighted in accent green within the title; below, 4 equal-width cards in a single row (stacking to fewer columns on smaller viewports), each card white with a thin border/soft shadow and rounded corners; each card has a small circular icon badge at the top (cloud, brain/chip, code brackets, rocket — one per pillar), a bold title, a short gray description, a divider, then a checklist of 4 items each with a small green checkmark, and finally a green "Learn More →" text link at the card's bottom-left.

### 5. Our Products

- Title: "Products That Solve Real Problems"
- Subtext: "We build and maintain powerful products used by teams worldwide."
- 3-card layout (each with icon, name, description, link, and a screenshot placeholder below):
  1. **TenantPlane** — Next-gen Tenant Management Platform for Kubernetes. ("Explore TenantPlane →")
  2. **Internal Tools** — Powerful internal tools that improve productivity and automation. ("Learn More →")
  3. **AI Platforms** — AI-powered platforms for intelligent automation and analytics. ("Explore Platforms →")
- Bottom CTA bar: "Want to build something amazing together?" + "Let's Build Your Product →" button
- Keep this whole section within a single viewport window (no internal scroll spillover).
- Note: card titles are placeholders — real project names to be swapped in later; build with placeholder cards/content for now.
- **Look:** white background, centered heading/subtext at top; 3 cards side-by-side, each with a small colored square icon badge (each product gets its own accent color — e.g. green, gray, purple — inside a rounded-square badge), bold product name, one-line gray description, green text link with arrow, and below that a rounded, bordered screenshot/dashboard-preview placeholder box that fills the lower part of the card; at the very bottom of the section, a full-width horizontal bar (light border/background, spans the content width) holding a centered prompt line and a solid green CTA button side by side — this bar visually closes off the section. The whole section is sized to fit in one screen/window without needing to scroll within it.

### 6. Selected Case Studies / Blogs

- Header: "Selected Case Studies" (left) + "View all case studies →" (right)
- 3-card grid, each with a screenshot placeholder, industry tag, title, short description, "View Case Study →":
  1. Healthcare — Hospital Management System
  2. Education — School ERP System
  3. Manufacturing — Inventory Management Platform
- Note: this section will later be repurposed for actual Blogs data — build with the same card structure and placeholders for now.
- **Look:** white background; header row with bold left-aligned section title and a green "View all case studies →" link right-aligned on the same line; below, 3 cards in a row, each with a rounded, bordered UI-screenshot placeholder at the top, a small colored industry tag/pill (a different accent color per card, e.g. teal/orange/purple) just under the image, a bold card title, a short gray description, and a green "View Case Study →" link at the bottom.

### 7. Our Development Process

- Title: "Our Development Process"
- 5-step horizontal timeline with icons (dotted connector line between steps), **interactive** (hover/click state on each icon):
  1. Discover — Understanding your business and goals
  2. Design — Planning architecture and user experience
  3. Develop — Building scalable and high-quality software
  4. Deploy — Secure deployment and migration
  5. Support — Continuous support and improvement
- **Look:** full-width band, centered bold heading at top; below it, a single horizontal row of 5 circular icon badges (outlined or filled in the accent green) connected by a dotted/dashed horizontal line running through their centers; each icon has a bold step name directly beneath it and a short gray description under that; icons are interactive — hover (or tap, for touch) should give a visual state change such as the badge filling solid green or scaling up slightly to signal interactivity.

### 8. Our Team & Culture

- Eyebrow: "OUR TEAM & CULTURE"
- Title: "Great People. Strong Culture. Building the Future Together."
- Subtext: "We are a team of passionate engineers, designers, and problem solvers who believe in ownership, collaboration, and continuous learning."
- 3 value props with icons:
  - Collaborative by Nature — We believe the best solutions come from diverse minds working together.
  - Learning Always — We encourage curiosity and invest in continuous learning and growth.
  - Ownership First — We take ownership of challenges and are committed to delivering impact.
- Left side: team photo collage (placeholders for now)
- **Look:** two-column layout on a light background (a very faint green-tinted background wash behind the photo collage is fine). Left column: an offset/collage grid of 2–3 rounded team-photo placeholders with a soft decorative pattern (small dot or line accents in green) peeking from behind. Right column: small green uppercase eyebrow label, then a bold multi-line heading with "Together" highlighted in green, then gray subtext paragraph, then a vertical stack of 3 rows each pairing a small green icon badge with a bold title and a short gray description line.

### 9. Contact Us

- Eyebrow: "LET'S WORK TOGETHER"
- Title: "Have a Project in Mind? Let's Build Something Great."
- Subtext: "Whether you have a clear plan or just an idea, we're here to help you turn it into a powerful digital solution."
- 3 trust indicators: Quick Response (reply within 24 business hours), Confidential (your info is safe), Free Consultation (let's discuss your idea and find the right path)
- Right side: contact form (front-end only, **no backend submission for this phase** — form UI only, submit button non-functional or console-log stub)
  - Fields: Your Name*, Work Email*, Company Name, Phone Number, How can we help you?\* (dropdown), Project Details (textarea)
  - Submit button: "Send Message →"
  - Privacy note: "We respect your privacy. Your information will never be shared."
- **Look:** two-column layout, light background. Left column: small green uppercase eyebrow label, bold heading with "Build Something Great" highlighted in green, gray subtext, and below that a horizontal row of 3 trust indicators, each a small icon + bold short label + one-line gray description. Right column: a white card with a soft shadow/border containing a "Send us a message" heading, then form fields laid out with Name/Email side-by-side in a 2-column grid, Company/Phone side-by-side likewise, then full-width dropdown ("How can we help you?") and full-width textarea ("Project Details"), then a full-width solid green "Send Message →" button, and a small gray privacy note (with a small lock icon) underneath the button.

### 10. Footer

- Logo + tagline: "Engineering modern solutions, AI, and cloud platforms that drive real business impact."
- Social icons: (GitHub, X/Twitter, LinkedIn — placeholders)
- 4 link columns (routing placeholders only, no live pages yet):
  - **Products**: TenantPlane, Upcoming Products
  - **Solutions**: Cloud Engineering, AI Solutions, Enterprise Software, Digital Products
  - **Resources**: Blog, Documentation, Case Studies
  - **Company**: About Us, Careers, Contact Us
- Bottom bar: copyright "© 2026 deboistech Technologies Pvt. Ltd. All rights reserved." + Privacy Policy + Terms of Service links
- **Background color: dark, matching the brand green** (not plain black)
- **Look:** full-width dark section, background is a deep dark-green tone (not pure black) to tie back to the brand color; logo and tagline rendered in white/light-gray for contrast, with small circular social icon buttons beneath them; the 4 link columns use a bold white column heading with muted light-gray link items underneath; a thin light-toned divider line separates the link columns from the bottom bar; the bottom bar has copyright text left-aligned in light gray and Privacy Policy / Terms of Service links right-aligned, all in a smaller font size than the rest of the footer.

## Open Items (pending from user)

- Final color palette and fonts
- Logo asset
- Hero right-side image
- TenantPlane product screenshot
- Product card screenshots (3x)
- Case study / blog card images (3x)
- Team photos (3x)
- Final project names for "Our Products" section
- Final blog posts to replace case-study placeholders
