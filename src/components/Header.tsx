import { useEffect, useState } from "react";
import "./header.css";
import MenuTree from "./MenuTree";
import { getNavigation } from "../lib/navigation";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

/*
------------------------------------
WordPress URL
------------------------------------
*/
const WORDPRESS_URL = "https://creativewebgraphic.com/nrccwordpress";

/*
------------------------------------
Normalize URL
------------------------------------
*/
function normalizeUrl(url: string) {
  if (!url) return "/";
  return url.replace(WORDPRESS_URL, "").replace(/\/$/, "") || "/";
}

/*
------------------------------------
Menu Interface
------------------------------------
*/
interface MenuItem {
  ID: number;
  title: string;
  url: string;
  menu_item_parent?: string;
  child_items?: MenuItem[];
  children?: MenuItem[];
}

/*
------------------------------------
Build Tree
------------------------------------
*/
function buildMenuTree(items: any[]): MenuItem[] {
  const map: Record<number, MenuItem> = {};
  const roots: MenuItem[] = [];

  items.forEach((item) => {
    map[item.ID] = { ...item, children: [] };
  });

  items.forEach((item) => {
    if (item.menu_item_parent && item.menu_item_parent !== "0") {
      map[Number(item.menu_item_parent)]?.children?.push(map[item.ID]);
    } else {
      roots.push(map[item.ID]);
    }
  });

  return roots;
}

/*
------------------------------------
Header Component
------------------------------------
*/
export default function Header() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await getNavigation();
      // Debug: inspect first item to understand data shape from WordPress
      if (items?.length) {
        console.log("SAMPLE ITEM:", JSON.stringify(items[0], null, 2));
        console.log("child_items type:", typeof items[0]?.child_items);
        console.log("child_items value:", items[0]?.child_items);
      }
      const nestedMenu = buildMenuTree(items || []);
      console.log("TREE MENU:", JSON.stringify(nestedMenu, null, 2));
      setMenu(nestedMenu);
    } catch (error) {
      console.error("MENU ERROR:", error);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <nav className="main-nav">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <MenuTree items={menu} />
            </div>

            {/* HAMBURGER BUTTON */}
            <button
              className="ml-auto text-3xl text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* DRAWER */}
          <div className="fixed right-0 top-0 z-[10000] h-full w-80 overflow-y-auto bg-white shadow-2xl">

            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-gray-700 hover:text-black"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            {/* MENU ITEMS */}
            <nav className="flex flex-col py-2">
              {menu.length > 0 ? (
                menu.map((item) => (
                  <MobileMenuItem
                    key={item.ID}
                    item={item}
                    depth={0}
                    closeMenu={() => setMobileOpen(false)}
                    currentPath={location.pathname}
                  />
                ))
              ) : (
                <p className="px-6 py-4 text-gray-500">Loading menu...</p>
              )}
            </nav>

          </div>
        </div>
      )}
    </>
  );
}

/*
------------------------------------
Mobile Menu Item (recursive)
------------------------------------
*/
function MobileMenuItem({
  item,
  closeMenu,
  currentPath,
  depth = 0,
}: {
  item: MenuItem;
  closeMenu: () => void;
  currentPath: string;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);

  // Resolve children — WordPress may return child_items as an object (keyed by ID), array, or undefined
  const resolveChildren = (item: MenuItem): MenuItem[] => {
    if (Array.isArray(item.children) && item.children.length > 0) return item.children;
    if (Array.isArray(item.child_items) && item.child_items.length > 0) return item.child_items;
    // WordPress REST API sometimes returns child_items as a plain object { "123": {...}, "456": {...} }
    if (item.child_items && typeof item.child_items === "object" && !Array.isArray(item.child_items)) {
      return Object.values(item.child_items) as MenuItem[];
    }
    return [];
  };

  const submenuItems: MenuItem[] = resolveChildren(item);

  const hasChildren = submenuItems.length > 0;
  const isActive = normalizeUrl(item.url) === currentPath;

  // Indent nested items
  const paddingLeft = 24 + depth * 16;

  return (
    <div>
      {/* ROW */}
      <div
        className={`flex items-center justify-between border-b border-gray-100 ${
          isActive ? "bg-primary/10" : "hover:bg-gray-50"
        }`}
        style={{ paddingLeft, paddingRight: 16, minHeight: 48 }}
      >
        {/* LINK */}
        <Link
          to={normalizeUrl(item.url)}
          className={`flex-1 py-3 text-sm font-medium ${
            isActive ? "text-primary font-semibold" : "text-gray-800"
          }`}
          onClick={() => {
            if (!hasChildren) closeMenu();
          }}
        >
          {item.title}
        </Link>

        {/* EXPAND / COLLAPSE BUTTON */}
        {hasChildren && (
          <button
            className="ml-2 flex h-8 w-8 items-center justify-center rounded text-gray-500 hover:bg-gray-200"
            onClick={(e) => {
              e.preventDefault();
              setOpen((prev) => !prev);
            }}
            aria-label={open ? "Collapse submenu" : "Expand submenu"}
          >
            {open ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </button>
        )}
      </div>

      {/* SUBMENU (recursive) */}
      {hasChildren && open && (
        <div className="bg-gray-50">
          {submenuItems.map((child) => (
            <MobileMenuItem
              key={child.ID}
              item={child}
              depth={depth + 1}
              closeMenu={closeMenu}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
