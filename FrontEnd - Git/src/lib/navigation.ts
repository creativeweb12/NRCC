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

  return (
    url
      .replace(WORDPRESS_URL, "")
      .replace(/\/$/, "") || "/"
  );
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
  href: string
): NavItem | null => {
  return null;
};
