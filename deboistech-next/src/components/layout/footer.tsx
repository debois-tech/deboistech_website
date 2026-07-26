import Link from "next/link";

const groups = [
  { title: "Products", items: [["TenantPlane", "https://tenantplane.deboistech.in/"], ["MotoAdmin", "https://www.motoadmin.in/"]] },
  { title: "Resources", items: [["Blog", "/blogs"], ["FAQ", "/faq"]] },
  { title: "Services", items: [["Build", "/services#build"], ["Scale", "/services#scale"], ["Accelerate", "/services#accelerate"]] },
  { title: "Company", items: [["About Us", "/about"], ["Careers", "/careers"], ["Contact Us", "/contact"]] },
] as const;

export function Footer() {
  return <footer className="bg-primary-900 px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
    <div className="grid gap-12 lg:grid-cols-[2fr_3fr]"><div><Link href="/" className="text-2xl font-bold text-white">deboistech</Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">Engineering modern solutions, AI, and cloud platforms that drive real business impact.</p><div className="mt-6 flex gap-3"><a href="https://github.com/debois-tech" className="text-gray-400 hover:text-white">GitHub</a><a href="https://www.linkedin.com/company/deboistech" className="text-gray-400 hover:text-white">LinkedIn</a></div></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{groups.map((group) => <div key={group.title}><h4 className="text-sm font-bold text-white">{group.title}</h4><ul className="mt-4 space-y-3">{group.items.map(([label, href]) => <li key={label}>{href.startsWith("http") ? <a href={href} className="text-sm text-gray-400 hover:text-white">{label}</a> : <Link href={href} className="text-sm text-gray-400 hover:text-white">{label}</Link>}</li>)}</ul></div>)}</div>
    </div><div className="mt-12 border-t border-primary-700 pt-8"><p className="text-xs text-gray-500">© {new Date().getFullYear()} deboistech. All rights reserved.</p></div>
  </div></footer>;
}
