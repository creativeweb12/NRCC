import { Link } from "react-router-dom";

import {
  footerLinks,
  navigation,
} from "@/lib/navigation";

const lastUpdated = new Date().toLocaleDateString(
  "en-IN",
  {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }
);

export function SiteFooter() {
  const exploreLinks = navigation.slice(1, 6);

  const importantLinks = navigation.slice(6);

  return (
    <footer className="mt-16 border-t-4 border-saffron bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Top Section */}
        {/* Footer Menu Columns */}
<div className="grid gap-10 md:grid-cols-4">
  {/* Address */}
  <div className="md:col-span-2">
    <h2 className="text-2xl font-bold">
      National Research Centre on Camel
    </h2>

    <address className="mt-5 not-italic text-base leading-8 text-primary-foreground/90">
      Post Bag No. 07, Jorbeer
      <br />
      Bikaner – 334 001, Rajasthan, India
      <br />
      Phone: +91-151-2230183
      <br />
      Email: director@nri.gov.in
    </address>
  </div>

  {/* Explore Links */}
  <div>
    <h2 className="mb-5 text-lg font-bold uppercase tracking-wide text-saffron">
      Explore
    </h2>

    <ul className="space-y-3 text-base">
      <li>
        <Link
          to="/about-us"
          className="hover:text-saffron hover:underline"
        >
          About Us
        </Link>
      </li>

      <li>
        <Link
          to="/research"
          className="hover:text-saffron hover:underline"
        >
          Research
        </Link>
      </li>

      <li>
        <Link
          to="/divisions-sections"
          className="hover:text-saffron hover:underline"
        >
          Divisions & Sections
        </Link>
      </li>

      <li>
        <Link
          to="/publications"
          className="hover:text-saffron hover:underline"
        >
          Publications
        </Link>
      </li>

      <li>
        <Link
          to="/news-events"
          className="hover:text-saffron hover:underline"
        >
          News & Events
        </Link>
      </li>
    </ul>
  </div>

  {/* Important Links */}
  <div>
    <h2 className="mb-5 text-lg font-bold uppercase tracking-wide text-saffron">
      Important
    </h2>

    <ul className="space-y-3 text-base">
      <li>
        <Link
          to="/farmer-training"
          className="hover:text-saffron hover:underline"
        >
         Training Program
        </Link>
      </li>

      <li>
        <Link
          to="/recruitment"
          className="hover:text-saffron hover:underline"
        >
          Recruitment
        </Link>
      </li>

      <li>
        <Link
          to="/tenders"
          className="hover:text-saffron hover:underline"
        >
          Tenders
        </Link>
      </li>

      <li>
        <Link
          to="/rti"
          className="hover:text-saffron hover:underline"
        >
          RTI
        </Link>
      </li>

      <li>
        <Link
          to="/downloads"
          className="hover:text-saffron hover:underline"
        >
          Downloads
        </Link>
      </li>

      <li>
        <Link
          to="/facilities"
          className="hover:text-saffron hover:underline"
        >
          Facilities
        </Link>
      </li>

      <li>
        <Link
          to="/contact-us"
          className="hover:text-saffron hover:underline"
        >
          Contact Us
        </Link>
      </li>
    </ul>
  </div>
</div>

        {/* Divider */}
        <hr className="my-8 border-primary-foreground/20" />
        {/* Bottom Footer Links */}
      <nav
        aria-label="Footer policy links"
        className="mt-6"
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/90">
          <li>
            <Link
              to="/privacy-policy"
              className="hover:text-saffron hover:underline"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              to="/hyperlink-policy"
              className="hover:text-saffron hover:underline"
            >
              Hyperlink Policy
            </Link>
          </li>

          <li>
            <Link
              to="/copyright-policy"
              className="hover:text-saffron hover:underline"
            >
              Copyright Policy
            </Link>
          </li>

          <li>
            <Link
              to="/terms-conditions"
              className="hover:text-saffron hover:underline"
            >
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link
              to="/accessibility-statement"
              className="hover:text-saffron hover:underline"
            >
              Accessibility Statement
            </Link>
          </li>

          <li>
            <Link
              to="/sitemap"
              className="hover:text-saffron hover:underline"
            >
              Sitemap
            </Link>
          </li>

          <li>
            <Link
              to="/help"
              className="hover:text-saffron hover:underline"
            >
              Help
            </Link>
          </li>

          <li>
            <Link
              to="/feedback"
              className="hover:text-saffron hover:underline"
            >
              Feedback
            </Link>
          </li>

          <li>
            <Link
              to="/web-information-manager"
              className="hover:text-saffron hover:underline"
            >
              Web Information Manager
            </Link>
          </li>
        </ul>
      </nav>
        {/* Bottom Policy Links */}
        <nav aria-label="Footer policy links">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/90">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="transition hover:text-saffron hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col gap-3 text-sm text-primary-foreground/80 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} National Research Centre on Camel.
            All rights reserved.
          </p>

          <p>
            Last Updated:{" "}
            <time dateTime={new Date().toISOString()}>
              {lastUpdated}
            </time>
          </p>
        </div>
      </div>
    </footer>
  );
}