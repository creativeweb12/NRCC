import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

function normalizeUrl(url: string): string {
  if (!url) return "/";

  return (
    url
      .replace(WORDPRESS_URL, "")
      .replace("/nrccwordpress", "")
      .replace(/\/$/, "") || "/"
  );
}

/*
-----------------------------------
Fetch Page By URI
-----------------------------------
*/

async function fetchPageByUri(uri: string) {
  const cleanUri = uri.replace(/^\/+|\/+$/g, "");

  const variants = [
    `${cleanUri}/`,
    cleanUri,
    `/${cleanUri}/`,
    `/${cleanUri}`,
  ];

  console.log("TRYING URI VARIANTS:", variants);

  for (const variant of variants) {
    const query = `
      query GetPage {
        page(
          id: "${variant}",
          idType: URI
        ) {
          id
          title
          uri
          slug
        }
      }
    `;

    console.log("TRYING URI:", variant);

    try {
      const response = await fetch(
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

      const result = await response.json();

      console.log(
        "PAGE RESULT:",
        result
      );

      if (result.errors) {
        console.error(
          `GRAPHQL ERROR for variant "${variant}":`,
          result.errors
        );

        continue;
      }

      if (result?.data?.page) {
        console.log(
          "PAGE FOUND:",
          result.data.page
        );

        return result.data.page;
      }
    } catch (error) {
      console.error(
        "PAGE FETCH ERROR:",
        error
      );
    }
  }

  console.warn(
    "ALL URI VARIANTS FAILED"
  );

  return null;
}

/*
-----------------------------------
Sidebar Component
-----------------------------------
*/

export default function Sidebar() {
  const location = useLocation();

  /*
  -----------------------------------
  States
  -----------------------------------
  */

  const [menuItems, setMenuItems] =
    useState<SidebarMenuItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openMenus, setOpenMenus] =
    useState<string[]>([]);

  /*
  -----------------------------------
  Toggle Menu
  -----------------------------------
  */

  const toggleMenu = (
    path: string
  ) => {
    setOpenMenus((prev) =>
      prev.includes(path)
        ? prev.filter(
            (item) =>
              item !== path
          )
        : [...prev, path]
    );
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

      console.log(
        "CURRENT PATHNAME:",
        location.pathname
      );

      /*
      -----------------------------------
      STEP 1
      Decide menu slug manually
      -----------------------------------
      */

      let menuSlug = "sidebar";

 /*
--------------------------------
RESEARCH SIDEBAR PATHS
--------------------------------
*/

const currentPath =
  location.pathname.replace(/\/$/, "");

const researchPaths = [
  "/research",
  "/research-programs",
  "/institute-projects",
  "/sponsored-projects",
  "/network-projects",
  "/hrd",
  "/staff",
  "/ipr",
  "/divisions-sections",
  "/publications",
  "/research-sections",
]; 


/*
--------------------------------
Divisions and Sections PATHS
--------------------------------
*/

const divisionsPaths = [
  "/administrative-section",
  "/administration",
  "/technical-units",
  "/finance-accounts",
  "/establishment",
  "/purchase-section",
  "/it-cell",
  "/estate"
];

const newsPaths = [
  "/news",
  "/events",
  "/gallery",
  "/latest-news",
  "/press-releases",
  "/announcements",
  "/workshops",
  "/conferences",
  "/photo-gallery",
  "/video-gallery",
  "/event-highlights",
  "/media-archive",
 

];

const academictrainingPaths = [
  "/training-program",
  "/academic-activities",
  "/farmer-training",
  "/student-training",
  "/collaborations",
  "/academic-calendar",
  "/training-programs"
];

const recruitmentPaths = [
  "/career-opportunities",
  "/results-notices",
];

const tendersPaths = [
  "/active-tenders",
  "/tender-archive",
  "/closed-tenders",
  "/tender-results",
  "/archived-notices",
];

const downloadsPaths =[
  "/forms",
  "/circulars-notices",
  "/application-forms",
  "/training-forms",
  "/recruitment-forms",
  "/office-orders",
  "/circulars",
  "/notifications",
  "/guidelines",
]

const facilitiesPaths = [
  "/central-instrumentation-facility-2",
  "/guest-house",
  "/library",
  "/tourism",
  "/conference-hall",
  "/community-hall",
  "/sports-ground",
]

const contactusPaths=[
  "/contact-information",
  "/communication",
]

const rtiPaths=[

  "/rti-information",
  "/rti-documents",
  "/rti-act",
  "/rti-manual",
 "/disclosure-documents",
  "/public-information-officer",

  
  "/annual-returns",
  "/rti-reports",


]
if (
  currentPath.includes("/about-us")
) {
  menuSlug = "about-sidebar";
}

/*
--------------------------------
DIVISIONS
--------------------------------
*/

else if (
  divisionsPaths.includes(currentPath)
) {
  menuSlug = "divisions-sidebar";
}

/*
--------------------------------
RESEARCH SECTION
--------------------------------
*/

else if (
  researchPaths.includes(currentPath)
) {
  menuSlug = "research-sidebar";
}


/*
--------------------------------
ACADEMIC TRAINING
--------------------------------
*/
else if (
  academictrainingPaths.includes(currentPath)
) {
  menuSlug = "academictraining-sidebar";
}

/*
--------------------------------
CONTACT US
--------------------------------
*/
else if (
  contactusPaths.includes(currentPath)
) {

  menuSlug = "contactus-sidebar";
}

/*
--------------------------------
DOWNLOADS
--------------------------------
*/

else if (
  downloadsPaths.includes(currentPath)
) {
  menuSlug = "downloads-sidebar";
}

/*
--------------------------------
FACILITIES
--------------------------------
*/

else if (
  facilitiesPaths.includes(currentPath)
) {
  menuSlug = "facilities-sidebar";
}

/*
--------------------------------
NEWS
--------------------------------
*/


else if (
  newsPaths.includes(currentPath)
) {
  menuSlug = "news-sidebar";
}

/*
--------------------------------
RECRUITMENT
--------------------------------
*/
else if (
  recruitmentPaths.includes(currentPath)
) {
  menuSlug = "recruitment-sidebar";
}

/*
--------------------------------
RTI
--------------------------------
*/

else if (
   rtiPaths.includes(currentPath)
) {
  menuSlug = "rti-sidebar";
}

/*
--------------------------------
TENDERS
--------------------------------
*/

else if (
  tendersPaths.includes(currentPath)
) {
  menuSlug = "tenders-sidebar";
}

/*
--------------------------------
DEFAULT MENU
--------------------------------
*/

else {
  menuSlug = "header";
}

/*
--------------------------------
DEBUG
--------------------------------
*/

console.log(
  "CURRENT PATHNAME:",
  location.pathname
);

console.log(
  "USING MENU SLUG:",
  menuSlug
);


      /*
      -----------------------------------
      STEP 2
      Fetch Menu
      -----------------------------------
      */
      

      const menuQuery = `
        query GetSidebarMenu {
          menu(
           id: "${menuSlug}",
            idType: SLUG
          ) {
            id
            name
            slug

            menuItems(first: 100) {
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
        "MENU QUERY:",
        menuQuery
      );

      const response = await fetch(
        `${WORDPRESS_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            query: menuQuery,
          }),
        }
      );

      const result = await response.json();

      console.log(
        "MENU RESULT:",
        result
      );

      /*
      -----------------------------------
      GraphQL Errors
      -----------------------------------
      */

      if (result.errors) {
        console.error(
          "GRAPHQL MENU ERROR:",
          result.errors
        );

        setMenuItems([]);

        return;
      }

      /*
      -----------------------------------
      Menu Missing
      -----------------------------------
      */

      if (!result?.data?.menu) {
        console.error(
          "MENU NOT FOUND:",
          menuSlug
        );

        setMenuItems([]);

        return;
      }

      /*
      -----------------------------------
      Extract Menu Items
      -----------------------------------
      */

      const items =
        result.data.menu.menuItems.nodes || [];

      console.log(
        "RAW MENU ITEMS:",
        items
      );

      /*
      -----------------------------------
      TEMP DEBUG
      -----------------------------------
      */

      if (!items.length) {
        console.warn(
          "NO MENU ITEMS FOUND"
        );

        /*
        TEMP TEST MENU
        */

        setMenuItems([
          {
            id: "1",
            title: "Overview",
            url: "/overview",
            child_items: [],
          },
          {
            id: "2",
            title: "Objectives",
            url: "/objectives",
            child_items: [],
          },
        ]);

        return;
      }

      /*
      -----------------------------------
      Build Tree
      -----------------------------------
      */

      const menuMap: Record<
        string,
        SidebarMenuItem
      > = {};

      const rootItems:
        SidebarMenuItem[] = [];

      items.forEach((item: any) => {
        menuMap[item.id] = {
          id: item.id,
          title: item.label,
          url: item.path,
          parentId: item.parentId,
          child_items: [],
        };
      });

      items.forEach((item: any) => {
        const menuItem =
          menuMap[item.id];

        if (
          item.parentId &&
          menuMap[item.parentId]
        ) {
          menuMap[
            item.parentId
          ].child_items?.push(menuItem);
        } else {
          rootItems.push(menuItem);
        }
      });

      console.log(
        "ROOT ITEMS:",
        rootItems
      );

      setMenuItems(rootItems);
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
  Recursive Renderer
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
            normalizeUrl(
              location.pathname
            ) === path;

          const hasChildren =
            item.child_items &&
            item.child_items
              .length > 0;

          const isOpen =
            openMenus.includes(
              path
            );

          return (
            <li
              key={item.id}
              className={`sidebar-item ${
                isActive
                  ? "active"
                  : ""
              }`}
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
    return null;
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

      {renderMenu(
        menuItems
      )}
    </aside>
  );
}