import { Link } from "react-router-dom";
import { findByHref } from "@/lib/navigation";

type Crumb = { label: string; href?: string };

export function ContentPage({ pathname }: { pathname: string }) {
  const match = findByHref(pathname);
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  let title = "Page";
  let kicker: string | undefined;

  if (match) {
    crumbs.push({ label: match.section.label, href: match.section.href });
    if (match.group) {
      kicker = `${match.section.label} · ${match.group.label}`;
      crumbs.push({ label: match.group.label });
    }
    if (match.leaf) {
      crumbs.push({ label: match.leaf.label });
      title = match.leaf.label;
    } else {
      title = match.section.label;
    }
  } else {
    // Static pages (policies, sitemap, help)
    title = pathname
      .split("/")
      .filter(Boolean)
      .pop()!
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label: title });
  }

  return (
    <article>
      {/* Page hero */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href && i < crumbs.length - 1 ? (
                    <Link to={c.href} className="hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-wider text-saffron">
              {kicker}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-bold text-foreground">{title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_280px]">
        <section className="prose-invert max-w-none">
          <p className="text-base leading-relaxed text-foreground">
            This page presents information related to <strong>{title}</strong>. Detailed
            content will be published here as per the institute's content management
            policy and updated periodically by the Web Information Manager.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            For specific queries regarding this section, please contact the concerned
            officer through the{" "}
            <Link to="/contact-us" className="text-primary underline underline-offset-2">
              Contact Us
            </Link>{" "}
            section. You may also raise an information request through the{" "}
            <Link to="/rti" className="text-primary underline underline-offset-2">
              RTI
            </Link>{" "}
            portal.
          </p>

          {match?.group && (
            <div className="mt-8 rounded border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-card-foreground">
                More in {match.group.label}
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {match.group.items
                  .filter((l) => l.href !== pathname)
                  .map((l) => (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        className="block rounded border border-border bg-background px-3 py-2 text-sm hover:border-primary hover:bg-accent hover:text-accent-foreground"
                      >
                        {l.label} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>

        <aside aria-label="Related" className="space-y-4">
          {match?.section.groups && (
            <div className="rounded border border-border bg-card p-4">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-saffron">
                In this section
              </h2>
              <ul className="space-y-1.5 text-sm">
                {match.section.groups.flatMap((g) => g.items).map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className={
                        l.href === pathname
                          ? "font-semibold text-primary"
                          : "text-card-foreground hover:underline"
                      }
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded border border-border bg-secondary p-4 text-sm text-secondary-foreground">
            <p className="font-semibold">Need help?</p>
            <p className="mt-1">
              Visit our{" "}
              <Link to="/help" className="underline">
                Help
              </Link>{" "}
              page or use the{" "}
              <Link to="/contact-us/communication/feedback-form" className="underline">
                Feedback Form
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
