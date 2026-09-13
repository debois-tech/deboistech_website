import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DeboisTech IT Solutions Privacy Policy — how we collect, use, store, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — deboistech",
    description:
      "How we collect, use, store, and protect your personal information.",
    url: "/privacy-policy",
  },
};

const LAST_UPDATED = "21 July 2026";

interface Section {
  heading: string;
  /** Paragraphs rendered before any groups. */
  intro?: string[];
  groups?: { subheading?: string; lead?: string; bullets: string[] }[];
  /** Paragraphs rendered after the groups. */
  outro?: string[];
  /** Emphasised callout box. */
  callout?: string;
}

const SECTIONS: Section[] = [
  {
    heading: "Information We Collect",
    intro: [
      "Depending on how you interact with us, we may collect the following information.",
    ],
    groups: [
      {
        subheading: "Personal Information",
        bullets: [
          "Full name",
          "Email address",
          "Phone number",
          "Company or organization",
          "Job title",
          "Billing information",
          "Postal address",
        ],
      },
      {
        subheading: "Technical Information",
        bullets: [
          "IP address",
          "Browser type",
          "Device information",
          "Operating system",
          "Cookies",
          "Usage analytics",
          "Referral URLs",
          "Time zone",
        ],
      },
      {
        subheading: "Product & Service Information",
        lead: "When using our software products or cloud platforms, we may collect:",
        bullets: [
          "Account information",
          "Authentication details",
          "User preferences",
          "API usage",
          "Service logs",
          "Error reports",
          "Diagnostic information",
        ],
      },
    ],
  },
  {
    heading: "How We Collect Information",
    groups: [
      {
        lead: "Information may be collected when you:",
        bullets: [
          "Visit our website",
          "Contact us through forms or email",
          "Request a quotation",
          "Purchase our services",
          "Register for an event",
          "Subscribe to newsletters",
          "Apply for internships or employment",
          "Participate in surveys",
          "Use our software products",
          "Access APIs",
          "Contact customer support",
        ],
      },
    ],
  },
  {
    heading: "How We Use Your Information",
    groups: [
      {
        bullets: [
          "Deliver our products and services",
          "Manage customer accounts",
          "Process payments",
          "Provide customer support",
          "Improve our products",
          "Develop new services",
          "Respond to inquiries",
          "Send important service notifications",
          "Improve website performance",
          "Prevent fraud and abuse",
          "Maintain platform security",
          "Meet legal obligations",
        ],
      },
    ],
    callout: "We do not sell your personal information.",
  },
  {
    heading: "Cookies",
    groups: [
      {
        lead: "Our website may use cookies to:",
        bullets: [
          "Remember user preferences",
          "Improve website functionality",
          "Analyze website traffic",
          "Enhance user experience",
        ],
      },
    ],
    outro: [
      "Users may disable cookies through their browser settings, although some features may not function correctly.",
    ],
  },
  {
    heading: "Sharing of Information",
    groups: [
      {
        lead: "We only share information when necessary. This may include:",
        bullets: [
          "Cloud hosting providers",
          "Payment processors",
          "Email service providers",
          "Analytics providers",
          "Legal authorities when required by law",
          "Business partners involved in delivering services",
        ],
      },
    ],
    outro: [
      "We do not share personal information for advertising purposes without consent.",
    ],
  },
  {
    heading: "Data Security",
    groups: [
      {
        bullets: [
          "Encryption in transit",
          "Secure cloud infrastructure",
          "Access controls",
          "Multi-factor authentication",
          "Security monitoring",
          "Regular backups",
          "Role-based permissions",
        ],
      },
    ],
    outro: [
      "While we strive to protect your data, no internet transmission or storage system is completely secure.",
    ],
  },
  {
    heading: "Data Retention",
    groups: [
      {
        lead: "We retain personal information only for as long as necessary to:",
        bullets: [
          "Deliver services",
          "Meet legal obligations",
          "Resolve disputes",
          "Enforce agreements",
        ],
      },
    ],
    outro: [
      "When no longer required, information is securely deleted or anonymized where practical.",
    ],
  },
  {
    heading: "Third-Party Services",
    groups: [
      {
        bullets: [
          "Google Workspace",
          "GitHub",
          "Microsoft",
          "AWS",
          "Google Cloud",
          "Microsoft Azure",
          "Cloudflare",
          "Stripe",
          "Razorpay",
        ],
      },
    ],
    outro: [
      "These services maintain their own privacy policies, and we encourage users to review them.",
    ],
  },
  {
    heading: "Children's Privacy",
    intro: [
      "Our services are not intended for children under the age of 13 (or the applicable minimum age under local law).",
      "We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "International Data Transfers",
    intro: [
      "Depending on the services used, your information may be processed in countries outside your jurisdiction.",
      "We take reasonable steps to ensure that such transfers comply with applicable data protection laws.",
    ],
  },
  {
    heading: "Your Rights",
    groups: [
      {
        bullets: [
          "Access your personal information",
          "Correct inaccurate information",
          "Delete your information",
          "Restrict processing",
          "Object to processing",
          "Withdraw consent",
          "Request data portability",
        ],
      },
    ],
    outro: ["Requests can be submitted using the contact details below."],
  },
  {
    heading: "Email Communications",
    groups: [
      {
        bullets: [
          "Service notifications",
          "Security alerts",
          "Product updates",
          "Support communications",
          "Billing information",
          "Event confirmations",
        ],
      },
    ],
    outro: [
      "Marketing communications will only be sent where permitted by law, and users may unsubscribe at any time.",
    ],
  },
  {
    heading: "Recruitment & Careers",
    groups: [
      {
        lead: "If you apply for an internship or employment with DeboisTech, we may collect:",
        bullets: [
          "Resume/CV",
          "Portfolio",
          "Educational information",
          "Professional experience",
          "Interview notes",
          "Assessment results",
        ],
      },
    ],
    outro: [
      "Recruitment information is used solely for evaluating candidates and fulfilling employment-related obligations.",
    ],
  },
  {
    heading: "Intellectual Property",
    intro: [
      "Any documents, proposals, software, designs, source code, presentations, or other materials shared by DeboisTech remain the intellectual property of DeboisTech unless otherwise agreed in writing.",
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    intro: [
      "We may update this Privacy Policy from time to time.",
      "The latest version will always be published on our website with the updated effective date.",
    ],
  },
];

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2 text-base leading-7 text-gray-600">
      <span
        aria-hidden="true"
        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"
      />
      {children}
    </li>
  );
}

const LINK_CLASS =
  "font-medium text-primary-600 underline hover:text-primary-700";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <h1 className="section-heading">
              Privacy <span className="text-primary-600">Policy</span>
            </h1>
            <p className="mt-4 text-xs text-gray-400">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="pb-12">
              <p className="text-base leading-7 text-gray-600">
                DeboisTech IT Solutions (&ldquo;DeboisTech&rdquo;,
                &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is
                committed to protecting the privacy and security of our clients,
                users, partners, employees, and website visitors.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600">
                This Privacy Policy explains how we collect, use, store, disclose,
                and protect your personal information when you use our websites,
                products, software, services, applications, or otherwise interact
                with DeboisTech.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600">
                By accessing or using our services, you acknowledge that you have
                read and understood this Privacy Policy.
              </p>
            </div>

            {SECTIONS.map((section) => (
              <div key={section.heading} className="py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.heading}
                </h2>

                {section.intro?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-7 text-gray-600"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.groups?.map((group, index) => (
                  <div key={group.subheading ?? group.lead ?? index}>
                    {group.subheading && (
                      <h3 className="mt-6 text-lg font-semibold text-gray-900">
                        {group.subheading}
                      </h3>
                    )}
                    {group.lead && (
                      <p className="mt-4 text-base leading-7 text-gray-600">
                        {group.lead}
                      </p>
                    )}
                    <ul className="mt-4 space-y-2">
                      {group.bullets.map((bullet) => (
                        <Bullet key={bullet}>{bullet}</Bullet>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.callout && (
                  <p className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 px-6 py-4 text-base font-semibold text-primary-800">
                    {section.callout}
                  </p>
                )}

                {section.outro?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-7 text-gray-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div className="py-12">
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-gray-600">
                <li>
                  <strong className="text-gray-900">
                    DeboisTech IT Solutions
                  </strong>
                </li>
                <li>
                  Email:{" "}
                  <a href="mailto:legal@deboistech.in" className={LINK_CLASS}>
                    legal@deboistech.in
                  </a>
                </li>
                <li>
                  General Inquiries:{" "}
                  <a href="mailto:connect@deboistech.in" className={LINK_CLASS}>
                    connect@deboistech.in
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.deboistech.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    www.deboistech.in
                  </a>
                </li>
                <li>Location: Nashik, Maharashtra, India</li>
              </ul>
            </div>

            <div className="py-12">
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                This Privacy Policy shall be governed by and interpreted in
                accordance with the laws of the Republic of India. Any disputes
                arising from or relating to this Privacy Policy shall be subject to
                the exclusive jurisdiction of the courts located in Nashik,
                Maharashtra, India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-gray-500">
            DeboisTech IT Solutions &mdash; Building Technology. Creating Value.
          </p>
        </div>
      </section>
    </>
  );
}
