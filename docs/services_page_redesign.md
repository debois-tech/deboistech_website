# Services Page Redesign — deboistech.in

## Overview

Replace the current flat 9-card grid with a **3-tier spectrum layout** combined with **problem → solution framing** for each service. This eliminates repetition, creates visual hierarchy, and makes every service feel specific and actionable.

---

## Section 1: Page Header

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    Our Services                             │
│                                                             │
│   Technology solutions that solve real business problems.   │
│   Not feature lists — outcomes you can measure.             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Copy:**

- Heading: `Our Services`
- Subheading: `Technology solutions that solve real business problems. Not feature lists — outcomes you can measure.`

---

## Section 2: Tier Selector (Sticky or Top-of-Page)

A bold horizontal tab bar. Each tier gets a distinct color accent and a one-line hook. Clicking a tier scrolls to or expands the detailed grid below.

| Tier           | Color Accent          | Hook                               |
| -------------- | --------------------- | ---------------------------------- |
| **Build**      | `#2563EB` (Deep Blue) | `Turn ideas into working software` |
| **Scale**      | `#F59E0B` (Amber)     | `Make your systems handle growth`  |
| **Accelerate** | `#7C3AED` (Violet)    | `Work smarter with AI and design`  |

**Behavior:**

- Desktop: Horizontal tabs, sticky on scroll
- Mobile: Vertical accordion or swipeable tabs
- Active tab: Full opacity + underline/border accent
- Inactive tabs: 60% opacity

---

## Section 3: Service Cards (Per Tier)

Each service card follows this structure:

```
┌──────────────────────────────────────────────────────────┐
│  [Icon]  Service Name                                    │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  "Your [specific problem] costs you [measurable pain]."  │
│                                                          │
│  → We [specific solution] using [approach/tech stack].   │
│                                                          │
│  [Mini outcome / metric / case study hint]               │
│                                                          │
│  [Talk to us about this →]                               │
└──────────────────────────────────────────────────────────┘
```

---

### TIER 1: BUILD

_Color: `#2563EB` (Deep Blue)_

---

#### Product Engineering

**Icon:** Rocket / Product box

**Problem:**

> `Your product roadmap keeps slipping because your team is juggling too many priorities.`

**Solution:**

> `We embed a dedicated squad that owns the full lifecycle — from architecture to launch — so you hit milestones without burning out your internal team.`

**Outcome hint:**

> `Recently: Shipped an inventory platform from zero to production in 14 weeks.`

**CTA:** `Talk to us about Product Engineering →`

---

#### Web Development

**Icon:** Browser window / Code brackets

**Problem:**

> `Your current site looks dated, loads slowly, and converts poorly.`

**Solution:**

> `We build fast, responsive web apps on modern stacks (React, Next.js, Node) with performance and SEO baked in from day one.`

**Outcome hint:**

> `Recently: Rebuilt a fintech landing page — load time dropped from 4.2s to 1.1s, conversions up 34%.`

**CTA:** `Talk to us about Web Development →`

---

#### Mobile Apps

**Icon:** Smartphone

**Problem:**

> `Your users expect a native app experience, but cross-platform tools feel limiting.`

**Solution:**

> `We choose the right approach — native, Flutter, or React Native — based on your performance needs and timeline. No one-size-fits-all.`

**Outcome hint:**

> `Shipped iOS and Android apps for a logistics client with real-time tracking.`

**CTA:** `Talk to us about Mobile Apps →`

---

### TIER 2: SCALE

_Color: `#F59E0B` (Amber)_

---

#### Cloud Engineering

**Icon:** Cloud / Server stack

**Problem:**

> `Your cloud bill is unpredictable and your infrastructure can't handle traffic spikes.`

**Solution:**

> `We design auto-scaling, cost-optimized architectures on AWS, Azure, or GCP with Infrastructure as Code and CI/CD from day one.`

**Outcome hint:**

> `Reduced a client's monthly AWS spend by 40% while doubling their concurrent user capacity.`

**CTA:** `Talk to us about Cloud Engineering →`

---

#### Enterprise Applications

**Icon:** Building / Connected nodes

**Problem:**

> `Your teams work in silos because your systems don't talk to each other.`

**Solution:**

> `We build API-first microservices and integrate legacy systems so data flows seamlessly across your organization.`

**Outcome hint:**

> `Unified 4 disconnected systems into a single ERP-grade platform for a manufacturing client.`

**CTA:** `Talk to us about Enterprise Applications →`

---

#### DevOps & Automation

**Icon:** Gears / Pipeline

**Problem:**

> `Releases are stressful and your team spends more time fixing deployments than shipping features.`

**Solution:**

> `We set up CI/CD pipelines, container orchestration, and monitoring so your team deploys confidently, multiple times a day.`

**Outcome hint:**

> `Cut deployment time from 4 hours to 12 minutes for a SaaS client.`

**CTA:** `Talk to us about DevOps & Automation →`

---

### TIER 3: ACCELERATE

_Color: `#7C3AED` (Violet)_

---

#### AI Solutions

**Icon:** Brain / Sparkles

**Problem:**

> `You're sitting on data but can't turn it into actionable insights.`

**Solution:**

> `We integrate LLMs, build custom models, and automate workflows so your team makes decisions faster and your product gets smarter.`

**Outcome hint:**

> `Built an AI-powered document parser that cut data entry time by 85%.`

**CTA:** `Talk to us about AI Solutions →`

---

#### UI/UX Design

**Icon:** Pen tool / Layout grid

**Problem:**

> `Users sign up but don't stick around — your product is hard to use.`

**Solution:**

> `We run user research, wireframe flows, and prototype before a single line of code is written. Design that actually converts.`

**Outcome hint:**

> `Redesigned a B2B dashboard — user task completion rate improved from 52% to 89%.`

**CTA:** `Talk to us about UI/UX Design →`

---

#### Consulting

**Icon:** Compass / Lightbulb

**Problem:**

> `You need a technical strategy but don't want a 100-page deck you'll never read.`

**Solution:**

> `We deliver actionable roadmaps, architecture reviews, and hands-on advisory — practical advice you can execute next week.`

**Outcome hint:**

> `Helped a startup pivot their tech stack, cutting time-to-market by 3 months.`

**CTA:** `Talk to us about Consulting →`

---

## Section 4: How We Work

A 4-step horizontal timeline. Reuse the existing homepage pattern for consistency.

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Discover │ → │  Design  │ → │  Build   │ → │ Support  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

**Step descriptions:**

1. **Discover** — We understand your business, users, and constraints before writing any code.
2. **Design** — We prototype flows and architecture so you can see the solution before we build it.
3. **Build** — We ship in iterative sprints with weekly demos and real working software.
4. **Support** — We don't disappear at launch. We monitor, optimize, and scale with you.

---

## Section 5: CTA

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         Not sure which tier fits your project?              │
│                                                             │
│   Tell us what you're building and we'll point you          │
│   to the right approach — no pitch, just clarity.          │
│                                                             │
│              [Describe your project →]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**CTA Button copy:** `Describe your project →`

**Link target:** `/pages/contact.html` (pre-fill subject or tag with "Services inquiry")

---

## Design Notes

### Card Styling

- Background: Slightly off-white or very light gray (`#FAFAFA` or `#F8FAFC`)
- Border: 1px solid `#E5E7EB`, radius `12px`
- Hover state: Subtle shadow (`0 4px 20px rgba(0,0,0,0.06)`) + border color shifts to tier accent at 30% opacity
- Problem text: Slightly muted (`#6B7280`)
- Solution text: Body color (`#111827`)
- Outcome hint: Italic or small badge with tier accent color

### Tier Accent Usage

- Tab underline / active border
- Card top border (3px) on hover
- Icon color
- CTA link color

### Icons

- Use a consistent icon set (e.g., Lucide, Heroicons, or Font Awesome)
- Size: 24–28px
- Stroke width: 1.5–2px
- Color: Tier accent at full opacity

### Responsive

- Desktop: 3 cards per row within each tier
- Tablet: 2 cards per row
- Mobile: 1 card per row, full-width

---

## Content Removed from Current Page

| Removed Item                                                         | Reason                                             |
| -------------------------------------------------------------------- | -------------------------------------------------- |
| "Cloud Solutions" as separate card                                   | Merged into Cloud Engineering + DevOps             |
| Generic bullet lists (Cloud Architecture, DevOps & Automation, etc.) | Replaced with problem/solution narrative           |
| Identical "Learn More →" links                                       | Replaced with specific "Talk to us about [X]" CTAs |
| Flat 9-card grid with no hierarchy                                   | Replaced with 3-tier structure                     |

---

## Implementation Priority

1. Build the tier selector component
2. Rewrite all 8 service cards with problem/solution copy
3. Add hover states and tier color accents
4. Wire CTA buttons to contact form with pre-filled context
5. Test on mobile — accordion behavior is critical

---

_Generated for deboistech.in — Services Page Redesign_
