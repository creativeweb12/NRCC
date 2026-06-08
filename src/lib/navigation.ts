import axios from "axios";

/*
-----------------------------------
Navigation Interface
-----------------------------------
*/

export interface NavItem {
  ID: number;
  title: string;
  url: string;
  child_items?: NavItem[];
}

/*
-----------------------------------
WordPress Base URL
-----------------------------------
*/

const WORDPRESS_URL =
  "https://creativewebgraphic.com/nrccwordpress";

/*
-----------------------------------
WordPress Menu API
-----------------------------------
*/

const API =
  `${WORDPRESS_URL}/wp-json/menus/v1/menus/header`;

/*
-----------------------------------
Decode HTML Entities
-----------------------------------
*/

const decodeHtml = (
  html: string
): string => {
  const txt =
    document.createElement(
      "textarea"
    );

  txt.innerHTML = html;

  return txt.value;
};

/*
-----------------------------------
Normalize WordPress URL
Convert:
https://domain.com/page/

To:
/page
-----------------------------------
*/


const normalizeUrl = (
  url: string
): string => {
  if (!url) return "/";

  let normalized = url
    .replace(WORDPRESS_URL, "")
    .replace("/nrccwordpress", "")
    .replace(/\/+$/, "")
    .replace(/^\/+/, "");

  return normalized
    ? `/${normalized}`
    : "/";
};


/*
-----------------------------------
Format Nested Menu Items
-----------------------------------
*/

const formatMenuItems = (
  items: any[]
): NavItem[] => {
  return items.map((item) => ({
    ID: Number(item.ID),

    title: decodeHtml(
      item.title
    ),

    /*
      IMPORTANT:
      Convert WP URL
      to React Route
    */

    url: normalizeUrl(
      item.url
    ),

    /*
      Recursive Child Items
    */

    child_items:
      item.child_items &&
      item.child_items.length > 0
        ? formatMenuItems(
            item.child_items
          )
        : [],
  }));
};

/*
-----------------------------------
Fetch Navigation
-----------------------------------
*/

export const getNavigation =
  async (): Promise<
    NavItem[]
  > => {
    try {
      const response =
        await axios.get(API);

      console.log(
        "MENU RESPONSE:",
        response.data
      );

      /*
        API already contains
        recursive child_items
      */

      const items =
        response.data.items || [];

      return formatMenuItems(
        items
      );
    } catch (error) {
      console.error(
        "Menu API Error:",
        error
      );

      return [];
    }
  };

/*
-----------------------------------
Fallback Navigation
-----------------------------------
*/

export const navigation: NavItem[] =
  [];

export const footerLinks: NavItem[] =
  [];

/*
-----------------------------------
Find By URL
-----------------------------------
*/


export const findByHref = (
  href: string,
  items: NavItem[] = navigation
): any => {

  const normalizedHref =
    normalizeUrl(href);

  for (const section of items) {

    /*
    Section direct match
    */

    if (
      normalizeUrl(section.url) ===
      normalizedHref
    ) {
      return {
        section,
      };
    }

    /*
    Child items
    */

    if (
      section.child_items &&
      section.child_items.length
    ) {

      for (const child of section.child_items) {

        /*
        Child direct match
        */

        if (
          normalizeUrl(child.url) ===
          normalizedHref
        ) {
          return {
            section,
            group: {
              label: section.title,
              href: section.url,
              items:
                section.child_items,
            },
            leaf: {
              label: child.title,
              href: child.url,
            },
          };
        }

        /*
        Grandchild items
        */

        if (
          child.child_items &&
          child.child_items.length
        ) {

          for (const grandchild of child.child_items) {

            if (
              normalizeUrl(
                grandchild.url
              ) === normalizedHref
            ) {

              return {
                section,
                group: {
                  label: child.title,
                  href: child.url,
                  items:
                    child.child_items,
                },
                leaf: {
                  label:
                    grandchild.title,
                  href:
                    grandchild.url,
                },
              };
            }
          }
        }
      }
    }
  }

  return null;
};

