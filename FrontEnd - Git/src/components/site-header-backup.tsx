import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";

export function SiteHeader() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  const setScale = (v: number) => setFontScale(Math.min(130, Math.max(85, v)));

  return (
    <header className="border-b border-border bg-background">
      {/* Top utility bar — GIGW required: govt branding, accessibility tools */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
          <p className="font-medium">ICAR - National Research Centre on Camel</p>
          <nav aria-label="Accessibility tools" className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setScale(fontScale - 10)}
              aria-label="Decrease text size"
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setScale(100)}
              aria-label="Reset text size"
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setScale(fontScale + 10)}
              aria-label="Increase text size"
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
            >
              A+
            </button>
            <span aria-hidden="true" className="mx-1 opacity-40">
              |
            </span>
            <button
              type="button"
              onClick={() => document.documentElement.classList.toggle("dark")}
              aria-label="Toggle high-contrast / dark mode"
              className="rounded px-2 py-0.5 hover:bg-primary-foreground/15"
            >
              Contrast
            </button>
            <Link to="/sitemap" className="rounded px-2 py-0.5 hover:bg-primary-foreground/15">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>

      {/* Brand row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Institute home">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
          >
            NI
          </div>
          <div>
            <p className="text-base font-bold leading-tight text-foreground">National Research Centre on Camel</p>
            <p className="text-xs text-muted-foreground">An autonomous body under the Government of India</p>
          </div>
        </Link>
        <button
          type="button"
          className="md:hidden rounded border border-border px-3 py-2 text-sm"
          aria-expanded={mobileOpen}
          aria-controls="primary-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "Close menu" : "Menu"}
        </button>
      </div>

      {/* Primary navigation */}
      <nav
        id="primary-nav"
        aria-label="Primary"
        className={`${mobileOpen ? "block" : "hidden"} md:block border-t border-border bg-surface`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-2 md:flex-row md:flex-wrap">
          {navigation.map((section, i) => {
            const hasMenu = !!section.groups?.length;
            const isOpen = openIdx === i;
            return (
              <li
                key={section.label}
                className="relative md:static"
                onMouseEnter={() => hasMenu && setOpenIdx(i)}
                onMouseLeave={() => hasMenu && setOpenIdx(null)}
              >
                <div className="flex items-center">
                  <NavLink
                    to={section.href}
                    end={section.href === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2.5 text-sm font-medium text-surface-foreground hover:bg-primary hover:text-primary-foreground",
                        isActive && "bg-primary text-primary-foreground",
                      )
                    }
                  >
                    {section.label}
                  </NavLink>
                  {hasMenu && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${section.label} submenu`}
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="px-2 py-2.5 text-sm hover:bg-primary hover:text-primary-foreground md:hidden"
                    >
                      {isOpen ? "▴" : "▾"}
                    </button>
                  )}
                </div>

                {hasMenu && (
                  <div
                    className={`${isOpen ? "block" : "hidden"} md:absolute md:left-0 md:top-full md:z-30 md:min-w-[640px] md:border md:border-border md:bg-popover md:shadow-lg`}
                  >
                    <div className="grid gap-4 bg-popover p-4 md:grid-cols-2 lg:grid-cols-3">
                      {section.groups!.map((group) => (
                        <div key={group.label}>
                          <p className="mb-2 border-b border-border pb-1 text-xs font-bold uppercase tracking-wide text-saffron">
                            {group.label}
                          </p>
                          <ul className="space-y-1">
                            {group.items.map((leaf) => (
                              <li key={leaf.href}>
                                <NavLink
                                  to={leaf.href}
                                  onClick={() => {
                                    setOpenIdx(null);
                                    setMobileOpen(false);
                                  }}
                                  className={({ isActive }) =>
                                    cn(
                                      "block rounded px-2 py-1 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground",
                                      isActive && "bg-accent text-accent-foreground",
                                    )
                                  }
                                >
                                  {leaf.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
