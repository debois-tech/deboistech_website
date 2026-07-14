// =============================================================
// lib/widgets/tech-marquee.js
// Widget: Trusted Technologies — infinite logo scroll strip
// =============================================================
//
// USAGE
// ─────
// 1. Add a mount div:
//      <div id="tech-marquee-root"></div>
//
// 2. Include this script:
//      Root page : <script src="lib/widgets/tech-marquee.js"></script>
//      lib/pages : <script src="../widgets/tech-marquee.js"></script>
//
// 3. Call the renderer:
//      renderTechMarquee({
//        mountId:  "tech-marquee-root",
//        title:    "Trusted Technologies",
//        subtitle: "...",
//        logos:    TECH_LOGOS,  // use default or pass custom array
//        basePath: p,
//      });
//
// ADDING MORE LOGOS
// ─────────────────
// Push additional objects to TECH_LOGOS or pass a custom array.
// Each logo: { src: "images/...", alt: "Name", style: "" }
// The marquee auto-duplicates the set for seamless looping.
// =============================================================

/** Default logo set used on the home page. */
const TECH_LOGOS = [
  { src: "images/trusted_tech/aws.svg",        alt: "AWS"          },
  { src: "images/trusted_tech/docker.png",     alt: "Docker"       },
  { src: "images/trusted_tech/flutter.png",    alt: "Flutter",      style: "height:32px;" },
  { src: "images/trusted_tech/gcloud.png",     alt: "Google Cloud", style: "height:64px;" },
  { src: "images/trusted_tech/kubernetes.png", alt: "Kubernetes"   },
  { src: "images/trusted_tech/micro.png",      alt: "Microsoft"    },
  { src: "images/trusted_tech/mongo.png",      alt: "MongoDB"      },
  { src: "images/trusted_tech/node.png",       alt: "Node.js"      },
];

/**
 * Renders an infinite horizontal logo-scroll (marquee) section.
 * The logo set is automatically duplicated to create a seamless loop.
 *
 * @param {Object} opts
 * @param {string} opts.mountId    - ID of the container element
 * @param {string} opts.title      - Section heading text
 * @param {string} [opts.subtitle] - Optional subheading text
 * @param {Array}  opts.logos      - Array of { src, alt, style? } objects
 * @param {string} [opts.basePath] - Asset base path
 */
function renderTechMarquee({ mountId, title, subtitle, logos, basePath }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const p = basePath || ".";

  const logoSet = (set) =>
    set
      .map(
        (l) =>
          `<img src="${p}/${l.src}" alt="${l.alt}" class="scroll-item tech-logo"${
            l.style ? ` style="${l.style}"` : ""
          } />`
      )
      .join("\n");

  el.innerHTML = `
    <section class="reveal bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <h2 class="section-heading">${title}</h2>
          ${subtitle ? `<p class="section-subheading mx-auto">${subtitle}</p>` : ""}
        </div>
        <div class="mx-auto mt-32 max-w-full">
          <div class="overflow-hidden">
            <div class="scroll-track">
              ${logoSet(logos)}
              ${logoSet(logos)}
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
