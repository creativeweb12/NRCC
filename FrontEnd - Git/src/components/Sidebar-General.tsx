import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import "../styles/sidebar.css";

/*
-----------------------------------
WordPress URL
-----------------------------------
*/

const WORDPRESS_URL =
  "https://creativewebgraphic.com/nrccwordpress";

/*
-----------------------------------
Menu Interface
-----------------------------------
*/

interface SidebarMenuItem {
  id: string;

  title: string;

  url: string;

  parentId?: string | null;

  child_items?: SidebarMenuItem[];
}

/*
-----------------------------------
Normalize URL
-----------------------------------
*/

function normalizeUrl(
  url: string
): string {

  if (!url) return "/";

  return (
    url
      .replace(
        WORDPRESS_URL,
        ""
      )
      .replace(
        "/nrccwordpress",
        ""
      )
      .replace(/\/$/, "") || "/"
  );
}

/*
-----------------------------------
Detect Sidebar Menu
-----------------------------------
*/

function getSidebarMenuSlug(
  pathname: string
): string | null {

  /*
  -----------------------------------
  ABOUT
  -----------------------------------
  */

  const aboutPages = [

    "/about-us",

    "/institute-profile",

    "/overview",

    "/mandate",

    "/objectives",

    "/mission-vision",

    "/directors-desk",

    "/past-directors",

    "/organogram",

    "/committees",

  ];

  if (
    aboutPages.some((page) =>
      pathname.includes(page)
    )
  ) {

    return "about-sidebar";
  }

  /*
  -----------------------------------
  RESEARCH
  -----------------------------------
  */

  const researchPages = [

    "/research",

    "/institute-projects",

    "/sponsored-projects",

    "/network-projects",

    "/director",

    "/scientific-staff",

    "/administrative-staff",

    "/technical-staff",

    "/supporting-staff",

    "/research",

    "/research-areas",

    "/camel-health-research",

    "/biochemistry",

    "/publications",

    "/medicines",

    "/physiology",

    "/live-stock",

    "/grassland",

    "/agroforestry-units",

    "/annual-reports",

    "/patents",

    "/copy-rights",

    "/trade-marks",

    "/design",

    "/karabh",

    "/research-sections",

  ];

  if (
    researchPages.some((page) =>
      pathname.includes(page)
    )
  ) {

    return "research-sidebar";
  }

  /*
  -----------------------------------
  DIVISIONS & SECTIONS
  -----------------------------------
  */

  const divisionPages = [

    "/divisions-sections",

    "/divisions-sections-2",

    "/administration",

    "/administrative-section",

    "/finance-accounts",

    "/establishment",

    "/purchase-section",

    "/technical-units",

    "/it-cell",

    "/estate",

  ];

  if (
    divisionPages.some((page) =>
      pathname.includes(page)
    )
  ) {

    return "divisions-sidebar";
  }

  /*
  -----------------------------------
  FACILITIES
  -----------------------------------
  */

  if (
    pathname.includes(
      "/facilities"
    )
  ) {

    return "facilities-sidebar";
  }

  /*
  -----------------------------------
  DOWNLOADS
  -----------------------------------
  */

  if (
    pathname.includes(
      "/downloads"
    )
  ) {

    return "downloads-sidebar";
  }

  return null;
}

/*
-----------------------------------
Sidebar Component
-----------------------------------
*/

export default function Sidebar() {

  const location =
    useLocation();

  /*
  -----------------------------------
  States
  -----------------------------------
  */

  const [menuItems, setMenuItems] =
    useState<
      SidebarMenuItem[]
    >([]);

  const [loading, setLoading] =
    useState(true);

  const [openMenus, setOpenMenus] =
    useState<string[]>([]);

  /*
  -----------------------------------
  Toggle Dropdown
  -----------------------------------
  */

  const toggleMenu = (
    path: string
  ) => {

    setOpenMenus((prev) => {

      if (
        prev.includes(path)
      ) {

        return prev.filter(
          (item) =>
            item !== path
        );
      }

      return [
        ...prev,
        path,
      ];
    });
  };

  /*
  -----------------------------------
  Fetch Sidebar
  -----------------------------------
  */

  useEffect(() => {

    async function fetchSidebar() {

      try {

        setLoading(true);

        /*
        -----------------------------------
        Menu Slug
        -----------------------------------
        */

        const menuSlug =
          getSidebarMenuSlug(
            location.pathname
          );

        console.log(
          "MENU SLUG:",
          menuSlug
        );

        /*
        -----------------------------------
        No Menu
        -----------------------------------
        */

        if (!menuSlug) {

          setMenuItems([]);

          setLoading(false);

          return;
        }

        /*
        -----------------------------------
        GraphQL Query
        -----------------------------------
        */

        const query = `
          query GetSidebarMenu {

            menu(
              id: "${menuSlug}",
              idType: SLUG
            ) {

              id

              name

              slug

              menuItems(
                first: 100
              ) {

                nodes {

                  id

                  parentId

                  label

                  path
                }
              }
            }
          }
        `;

        console.log(
          "GRAPHQL QUERY:",
          query
        );

        /*
        -----------------------------------
        Fetch GraphQL
        -----------------------------------
        */

        const response =
          await fetch(
            `${WORDPRESS_URL}/graphql`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                query,
              }),
            }
          );

        /*
        -----------------------------------
        JSON Result
        -----------------------------------
        */

        const result =
          await response.json();

        console.log(
          "GRAPHQL RESULT:",
          result
        );

        /*
        -----------------------------------
        Extract Menu Items
        -----------------------------------
        */

        const items =
          result?.data?.menu
            ?.menuItems?.nodes || [];

        console.log(
          "MENU ITEMS:",
          items
        );

        /*
        -----------------------------------
        Empty
        -----------------------------------
        */

        if (!items.length) {

          setMenuItems([]);

          setLoading(false);

          return;
        }

        /*
        -----------------------------------
        Build Tree
        -----------------------------------
        */

        const menuMap:
          Record<
            string,
            SidebarMenuItem
          > = {};

        const rootItems:
          SidebarMenuItem[] = [];

        /*
        -----------------------------------
        Normalize Items
        -----------------------------------
        */

        items.forEach(
          (item: any) => {

            menuMap[item.id] = {

              id:
                item.id,

              title:
                item.label,

              url:
                normalizeUrl(
                  item.path
                ),

              parentId:
                item.parentId,

              child_items: [],
            };
          }
        );

        /*
        -----------------------------------
        Create Hierarchy
        -----------------------------------
        */

        items.forEach(
          (item: any) => {

            const menuItem =
              menuMap[
                item.id
              ];

            if (
              item.parentId &&
              menuMap[
                item.parentId
              ]
            ) {

              menuMap[
                item.parentId
              ].child_items?.push(
                menuItem
              );

            } else {

              rootItems.push(
                menuItem
              );
            }
          }
        );

        console.log(
          "ROOT ITEMS:",
          rootItems
        );

        /*
        -----------------------------------
        Update State
        -----------------------------------
        */

        setMenuItems(
          rootItems
        );

      } catch (error) {

        console.error(
          "SIDEBAR ERROR:",
          error
        );

        setMenuItems([]);

      } finally {

        setLoading(false);
      }
    }

    fetchSidebar();

  }, [location.pathname]);

  /*
  -----------------------------------
  Render Menu
  -----------------------------------
  */

  const renderMenu = (
    items: SidebarMenuItem[]
  ) => {

    return (

      <ul className="sidebar-menu">

        {items.map((item) => {

          const path =
            normalizeUrl(
              item.url
            );

          const isActive =
            location.pathname ===
            path;

          const hasChildren =
            item.child_items &&
            item.child_items.length >
              0;

          const isOpen =
            openMenus.includes(
              path
            );

          return (

            <li
              key={item.id}
              className={`sidebar-item
                ${
                  isActive
                    ? "active"
                    : ""
                }
              `}
            >

              <div className="sidebar-link">

                {hasChildren && (

                  <button
                    className="sidebar-toggle"
                    onClick={() =>
                      toggleMenu(
                        path
                      )
                    }
                  >

                    {isOpen
                      ? "▼"
                      : "►"}

                  </button>
                )}

                <Link to={path}>

                  {item.title}

                </Link>

              </div>

              {hasChildren &&
                isOpen && (

                  <div className="sidebar-submenu">

                    {renderMenu(
                      item.child_items ||
                        []
                    )}

                  </div>
                )}

            </li>
          );
        })}

      </ul>
    );
  };

  /*
  -----------------------------------
  Loading
  -----------------------------------
  */

  if (loading) {

    return (

      <aside className="sidebar">

        <h3 className="sidebar-title">
          IN THIS SECTION
        </h3>

        <p>
          Loading...
        </p>

      </aside>
    );
  }

  /*
  -----------------------------------
  Empty
  -----------------------------------
  */

  if (
    menuItems.length === 0
  ) {

    return (

      <aside className="sidebar">

        <h3 className="sidebar-title">
          IN THIS SECTION
        </h3>

        <p>
          No sidebar menu found.
        </p>

      </aside>
    );
  }

  /*
  -----------------------------------
  Final Render
  -----------------------------------
  */

  return (

    <aside className="sidebar">

      <h3 className="sidebar-title">
        IN THIS SECTION
      </h3>

      {renderMenu(menuItems)}

    </aside>
  );
}