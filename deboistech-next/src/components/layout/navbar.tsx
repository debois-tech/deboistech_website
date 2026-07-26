"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";

const links = [["Services", "/services"], ["Product", "/products"], ["About", "/about"], ["Blogs", "/blogs"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return <header className="fixed left-1/2 top-6 z-50 w-full max-w-4xl -translate-x-1/2 px-4">
    <nav className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white/95 px-5 py-3.5 shadow-lg backdrop-blur">
      <Link href="/" className="flex items-center"><img src="/images/logo.png" alt="deboistech" className="h-9 w-auto" /></Link>
      <div className="flex items-center gap-8">
        <ul className="hidden items-center gap-8 sm:flex">{links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm font-medium text-gray-600 hover:text-gray-900">{label}</Link></li>)}</ul>
        {user ? <Link href="/studio" className="hidden text-sm font-semibold text-primary-700 sm:inline">Studio</Link> : null}
        <Link href="/contact" className="hidden rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-800 sm:inline-flex">Let&apos;s Talk →</Link>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden" aria-label="Toggle menu">☰</button>
      </div>
    </nav>
    {open && <div className="mt-2 rounded-xl border border-gray-100 bg-white px-4 pb-4 pt-2 shadow-lg sm:hidden">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600">{label}</Link>)}<Link href="/contact" className="mt-3 inline-flex rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white">Let&apos;s Talk →</Link></div>}
  </header>;
}
