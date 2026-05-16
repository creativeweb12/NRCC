import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ContentPage } from "@/components/content-page";
import { findByHref } from "@/lib/navigation";

/**
 * Handles all non-home paths (formerly TanStack `$` splat route). Updates document title per path.
 */
export default function ContentPageRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    const navMatch = findByHref(pathname);
    let titleSegment = "Page";
    if (navMatch) {
      titleSegment = navMatch.leaf?.label ?? navMatch.section.label;
    } else {
      const segments = pathname.split("/").filter(Boolean);
      const slug = segments[segments.length - 1];
      titleSegment = slug
        ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Page";
    }
    document.title = `${titleSegment} — National Research Institute`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = `${titleSegment} — National Research Institute.`;
    if (metaDesc) metaDesc.setAttribute("content", desc);
  }, [pathname]);

  return <ContentPage pathname={pathname} />;
}
