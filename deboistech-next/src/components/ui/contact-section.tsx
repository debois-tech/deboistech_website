import { CONTACT_ASSURANCES, CONTACT_TOPICS, SITE, SITE_URL } from "@/lib/content";
import { Icon } from "@/components/ui/icon";

const FIELD_CLASS =
  "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600";

const LOCK_ICON =
  "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z";

/**
 * Contact form + trust indicators. Shared by the home page and /contact.
 *
 * Submits directly to FormSubmit (plan Phase 8, Option A) — a native form
 * POST with no JavaScript, so this stays a Server Component and keeps
 * working with JS disabled. Switching to the Supabase `contact_messages`
 * table (Option B) means swapping the action for the submitContact
 * Server Action in lib/actions/contact.ts.
 */
export function ContactSection({
  heading = "Have a Project in Mind? Let's",
  headingAccent = "Build Something Great.",
  background = "bg-white",
}: {
  heading?: string;
  headingAccent?: string;
  background?: string;
}) {
  return (
    <section className={`px-4 py-20 sm:px-6 sm:py-28 lg:px-8 ${background}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Let&apos;s work together</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {heading}{" "}
              <span className="text-primary-600">{headingAccent}</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Whether you have a clear plan or just an idea, we&apos;re here to help
              you turn it into a powerful digital solution.
            </p>

            <div className="mt-10 space-y-6">
              {CONTACT_ASSURANCES.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <Icon d={item.iconPath} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-sm text-gray-500">
              <p>
                Prefer email?{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="font-semibold text-primary-700 hover:text-primary-800"
                >
                  {SITE.contactEmail}
                </a>
              </p>
              <p className="mt-1">{SITE.location}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900">Send us a message</h3>
            <form
              action={`https://formsubmit.co/${SITE.contactEmail}`}
              method="POST"
              className="mt-6 space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={SITE_URL} />
              <input
                type="hidden"
                name="_subject"
                value="New enquiry from deboistech website!"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your Name"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Work Email"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-company" className="sr-only">
                    Company name
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company Name"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-help" className="sr-only">
                  How can we help you?
                </label>
                <select
                  id="contact-help"
                  name="help"
                  required
                  defaultValue=""
                  className={FIELD_CLASS}
                >
                  <option value="" disabled>
                    How can we help you?
                  </option>
                  {CONTACT_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-details" className="sr-only">
                  Project details
                </label>
                <textarea
                  id="contact-details"
                  name="details"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={FIELD_CLASS}
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message &rarr;
              </button>
            </form>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
              <Icon d={LOCK_ICON} className="h-4 w-4 shrink-0" />
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
