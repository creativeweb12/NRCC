import { useEffect } from "react";
import { Link } from "react-router-dom";

const news = [
  { date: "12 May 2026", title: "Institute publishes 2025–26 Annual Report", href: "/publications/institutional-publications/annual-reports" },
  { date: "08 May 2026", title: "International Workshop on Camel Genomics announced", href: "/news-and-events/events/workshops" },
  { date: "02 May 2026", title: "Recruitment notification for Scientist (Reproduction)", href: "/recruitment/career-opportunities/current-openings" },
  { date: "28 Apr 2026", title: "MoU signed with State Agricultural University", href: "/news-and-events/news/press-releases" },
];

const announcements = [
  { tag: "Tender", title: "Open Tender — Laboratory Equipment (Phase II)", href: "/tenders/active-tenders/open-tenders" },
  { tag: "Notice", title: "Office Order: Revised Working Hours – Summer 2026", href: "/downloads/circulars-and-notices/office-orders" },
  { tag: "Result", title: "Shortlisted Candidates — Technical Assistant", href: "/recruitment/results-and-notices/shortlisted-candidates" },
  { tag: "RTI", title: "Q1 2026 Disclosure Documents now available", href: "/rti/rti-documents/disclosure-documents" },
];

const research = [
  {
    title: "Camel Milk Genomics",
    desc: "Whole-genome sequencing programme to characterise functional traits of indigenous camel breeds.",
    href: "/research/research-divisions/biotechnology",
  },
  {
    title: "Climate-Resilient Nutrition",
    desc: "Designing arid-zone forage strategies to sustain productivity under heat stress.",
    href: "/research/research-divisions/camel-nutrition",
  },
  {
    title: "Therapeutic Camel Milk",
    desc: "Clinical evidence for camel milk applications in metabolic and autoimmune conditions.",
    href: "/research/research-programs/ongoing-projects",
  },
];

const events = [
  { day: "22", month: "May", title: "Workshop: Reproductive Biotechnology in Camelids", venue: "NRI Auditorium", href: "/news-and-events/events/workshops" },
  { day: "05", month: "Jun", title: "Farmer Training Programme — Kharif Season", venue: "Extension Block", href: "/academics-and-training/training-programs/farmer-training" },
  { day: "18", month: "Jun", title: "National Conference on Arid Animal Husbandry", venue: "Convention Centre", href: "/news-and-events/events/conferences" },
];

const publications = [
  { title: "Annual Report 2024–25", type: "Report", href: "/publications/institutional-publications/annual-reports" },
  { title: "Newsletter — Vol. 27, Issue 1", type: "Newsletter", href: "/publications/institutional-publications/newsletters" },
  { title: "Technical Bulletin: Camel Calf Management", type: "Bulletin", href: "/publications/institutional-publications/technical-bulletins" },
];

export default function HomePage() {
  useEffect(() => {
    document.title = "Home — National Research Institute";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Welcome to the National Research Institute. Explore research, publications, tenders, recruitment notifications and more.",
      );
    }
  }, []);

  return (
    <>
      {/* Hero / Home Banner */}
      <section
        aria-label="Home banner"
        className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
          <div>
            <p className="inline-block rounded bg-saffron px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-saffron-foreground">
              Government of India
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Advancing science. Serving the nation.</h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
              The National Research Centre on Camel is a premier ICAR institute dedicated to research, education and extension in
              arid-zone animal sciences — committed to farmer welfare, scientific excellence and transparent governance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/about-us/institute-profile/overview"
                className="rounded bg-saffron px-4 py-2 text-sm font-semibold text-saffron-foreground hover:opacity-90"
              >
                About the Institute
              </Link>
              <Link
                to="/research"
                className="rounded border border-primary-foreground/40 bg-transparent px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explore Research
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div
              aria-hidden="true"
              className="grid h-full place-items-center rounded border border-primary-foreground/15 bg-primary-foreground/5 p-6"
            >
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-saffron bg-primary text-3xl font-bold">
                  NI
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-saffron">Est. 1984</p>
                <p className="mt-1 text-sm text-primary-foreground/80">National Research Centre on Camel </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section aria-labelledby="quick-links-h" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 id="quick-links-h" className="sr-only">
            Quick Links
          </h2>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
        {/* Latest News */}
        <section aria-labelledby="news-h" className="rounded border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h2 id="news-h" className="text-lg font-bold text-foreground">
              Latest News
            </h2>
            <Link to="/news-and-events/news/latest-news" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {news.map((n) => (
              <li key={n.title}>
                <Link to={n.href} className="block px-4 py-3 hover:bg-accent">
                  <p className="text-xs font-semibold uppercase tracking-wider text-saffron">
                    <time>{n.date}</time>
                  </p>
                  <p className="mt-1 text-sm text-card-foreground">{n.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Announcements */}
        <section aria-labelledby="ann-h" className="rounded border border-border bg-card">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h2 id="ann-h" className="text-lg font-bold text-foreground">
              Announcements
            </h2>
            <Link to="/news-and-events/news/announcements" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {announcements.map((a) => (
              <li key={a.title}>
                <Link to={a.href} className="flex items-start gap-3 px-4 py-3 hover:bg-accent">
                  <span className="mt-0.5 inline-block rounded bg-india-green px-2 py-0.5 text-xs font-bold uppercase text-india-green-foreground">
                    {a.tag}
                  </span>
                  <span className="text-sm text-card-foreground">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Research Highlights */}
      <section aria-labelledby="research-h" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-saffron">Focus areas</p>
              <h2 id="research-h" className="mt-1 text-2xl font-bold text-foreground">
                Research Highlights
              </h2>
            </div>
            <Link to="/research" className="text-sm font-medium text-primary hover:underline">
              All research →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {research.map((r) => (
              <article key={r.title} className="rounded border border-border bg-card p-5">
                <h3 className="text-base font-bold text-card-foreground">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <Link to={r.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section aria-labelledby="events-h" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="events-h" className="text-2xl font-bold text-foreground">
            Upcoming Events
          </h2>
          <Link to="/news-and-events/events/workshops" className="text-sm font-medium text-primary hover:underline">
            All events →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <li key={e.title}>
              <Link
                to={e.href}
                className="flex h-full items-stretch gap-4 rounded border border-border bg-card hover:border-primary"
              >
                <div className="flex w-20 flex-col items-center justify-center bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold leading-none">{e.day}</span>
                  <span className="text-xs uppercase tracking-wider">{e.month}</span>
                </div>
                <div className="flex-1 py-3 pr-3">
                  <p className="text-sm font-semibold text-card-foreground">{e.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Venue: {e.venue}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Publications Highlights */}
      <section aria-labelledby="pub-h" className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 id="pub-h" className="text-2xl font-bold text-foreground">
              Publications Highlights
            </h2>
            <Link to="/publications" className="text-sm font-medium text-primary hover:underline">
              All publications →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {publications.map((p) => (
              <li key={p.title}>
                <Link
                  to={p.href}
                  className="block h-full rounded border border-border bg-card p-5 hover:border-primary"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-saffron">{p.type}</p>
                  <p className="mt-2 text-base font-semibold text-card-foreground">{p.title}</p>
                  <p className="mt-3 text-sm text-primary">Download PDF →</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
