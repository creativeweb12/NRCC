import { Link } from "react-router-dom";

import { footerLinks, navigation } from "@/lib/navigation";

const lastUpdated = new Date().toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-saffron bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-bold">National Research Centre on Camel</p>
            <address className="mt-2 not-italic text-sm leading-relaxed text-primary-foreground/85">
              Post Bag No. 07, Jorbeer
              <br />
              Bikaner – 334 001, Rajasthan, India
              <br />
              Phone: +91-151-2230183 · Email: director@nri.gov.in
            </address>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-saffron">Explore</h2>
            <ul className="space-y-1.5 text-sm">
              {navigation.slice(1, 7).map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="hover:underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-saffron">Important</h2>
            <ul className="space-y-1.5 text-sm">
              {navigation.slice(7).map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="hover:underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-primary-foreground/20" />

        {/* Mandatory GIGW links */}
        <nav aria-label="Mandatory policy links">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-primary-foreground/80">
          <p>© {new Date().getFullYear()} National Research Centre on Camel. All rights reserved.</p>
          <p>
            Last Updated: <time dateTime={new Date().toISOString()}>{lastUpdated}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
