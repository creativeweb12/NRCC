// Single source of truth for site navigation.
// Each leaf path is a real, resolvable URL handled by the React Router splat hierarchy.

export type NavLeaf = { label: string; href: string };
export type NavGroup = { label: string; items: NavLeaf[] };
export type NavSection = {
  label: string;
  href: string; // landing/overview page for the section
  groups?: NavGroup[];
};

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const make = (sectionLabel: string, groups: { label: string; items: string[] }[]): NavGroup[] => {
  const sec = slug(sectionLabel);
  return groups.map((g) => ({
    label: g.label,
    items: g.items.map((item) => ({
      label: item,
      href: `/${sec}/${slug(g.label)}/${slug(item)}`,
    })),
  }));
};

export const navigation: NavSection[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    groups: make("About Us", [
      { label: "Institute Profile", items: ["Overview", "Vision & Mission", "Objectives"] },
      {
        label: "Administration",
        items: ["Director's Desk", "Administrative Structure", "Committees", "Organizational Chart"],
      },
    ]),
  },
  {
    label: "Research",
    href: "/research",
    groups: make("Research", [
      {
        label: "Research Programs",
        items: ["Ongoing Projects", "Completed Projects", "Collaborative Projects", "Sponsored Projects"],
      },
      {
        label: "Research Divisions",
        items: ["Camel Breeding", "Camel Nutrition", "Camel Health", "Biotechnology", "Extension Education"],
      },
    ]),
  },
  {
    label: "Divisions & Sections",
    href: "/divisions-and-sections",
    groups: make("Divisions & Sections", [
      { label: "Scientific Divisions", items: ["Physiology", "Reproduction", "Disease Management"] },
      {
        label: "Administrative Sections",
        items: ["Administration", "Finance & Accounts", "Establishment", "Purchase Section"],
      },
      {
        label: "Technical Units",
        items: ["IT Cell", "Library", "Laboratory Facilities", "Instrumentation Unit"],
      },
    ]),
  },
  {
    label: "Publications",
    href: "/publications",
    groups: make("Publications", [
      {
        label: "Institutional Publications",
        items: ["Annual Reports", "Newsletters", "Technical Bulletins", "Manuals"],
      },
      {
        label: "Research Publications",
        items: ["Research Papers", "Journals", "Conference Proceedings", "Articles"],
      },
      {
        label: "Downloads",
        items: ["PDF Downloads", "Research Documents", "Reports Archive", "Guidelines"],
      },
    ]),
  },
  {
    label: "News & Events",
    href: "/news-and-events",
    groups: make("News & Events", [
      { label: "News", items: ["Latest News", "Press Releases", "Announcements"] },
      { label: "Events", items: ["Workshops", "Conferences", "Training Programs"] },
      { label: "Gallery", items: ["Photo Gallery", "Video Gallery", "Event Highlights", "Media Archive"] },
    ]),
  },
  {
    label: "Academics & Training",
    href: "/academics-and-training",
    groups: make("Academics & Training", [
      { label: "Training Programs", items: ["Farmer Training", "Student Training", "Internship Programs"] },
      { label: "Academic Activities", items: ["Research Fellowships", "Collaborations", "Academic Calendar"] },
    ]),
  },
  {
    label: "Recruitment",
    href: "/recruitment",
    groups: make("Recruitment", [
      { label: "Career Opportunities", items: ["Current Openings", "Contract Positions", "Notifications"] },
      { label: "Results & Notices", items: ["Shortlisted Candidates", "Results", "Corrigendum"] },
    ]),
  },
  {
    label: "Tenders",
    href: "/tenders",
    groups: make("Tenders", [
      { label: "Active Tenders", items: ["Open Tenders", "GeM Procurement"] },
      { label: "Tender Archive", items: ["Closed Tenders", "Tender Results", "Archived Notices"] },
    ]),
  },
  {
    label: "RTI",
    href: "/rti",
    groups: make("RTI", [
      { label: "RTI Information", items: ["RTI Act", "RTI Manual", "Public Information Officer"] },
      { label: "RTI Documents", items: ["Disclosure Documents", "Annual Returns", "RTI Reports"] },
    ]),
  },
  {
    label: "Downloads",
    href: "/downloads",
    groups: make("Downloads", [
      { label: "Forms", items: ["Application Forms", "Training Forms", "Recruitment Forms"] },
      {
        label: "Circulars & Notices",
        items: ["Office Orders", "Circulars", "Notifications", "Guidelines"],
      },
    ]),
  },
  {
    label: "Facilities",
    href: "/facilities",
    groups: make("Facilities", [
      { label: "Research Facilities", items: ["Laboratories", "Research Farms"] },
      { label: "Visitor Facilities", items: ["Guest House", "Campus Facilities", "Conference Hall"] },
    ]),
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    groups: make("Contact Us", [
      {
        label: "Contact Information",
        items: ["Address", "Telephone Directory", "Email Directory", "Location Map"],
      },
      {
        label: "Communication",
        items: ["Feedback Form", "Enquiry Form", "Support Contacts", "Help Desk"],
      },
    ]),
  },
];

export const footerLinks: NavLeaf[] = [
  { label: "Privacy Policy", href: "/policies/privacy-policy" },
  { label: "Hyperlink Policy", href: "/policies/hyperlink-policy" },
  { label: "Copyright Policy", href: "/policies/copyright-policy" },
  { label: "Terms & Conditions", href: "/policies/terms-and-conditions" },
  { label: "Accessibility Statement", href: "/policies/accessibility-statement" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Help", href: "/help" },
  { label: "Feedback", href: "/contact-us/communication/feedback-form" },
  { label: "Web Information Manager", href: "/policies/web-information-manager" },
];

// Lookup helper for the catch-all route to render breadcrumbs/title from nav.
export function findByHref(href: string):
  | { section: NavSection; group?: NavGroup; leaf?: NavLeaf }
  | null {
  for (const section of navigation) {
    if (section.href === href) return { section };
    if (!section.groups) continue;
    for (const group of section.groups) {
      for (const leaf of group.items) {
        if (leaf.href === href) return { section, group, leaf };
      }
    }
  }
  return null;
}
