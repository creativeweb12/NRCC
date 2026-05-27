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
WordPress Menu API
-----------------------------------
*/

const API =
  "https://creativewebgraphic.com/nrccwordpress/wp-json/menus/v1/menus/header";

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
Decode Nested Child Items
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

    url: item.url || "#",

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
  async (): Promise<NavItem[]> => {
    try {
      const response =
        await axios.get(API);

      console.log(
        "MENU RESPONSE:",
        response.data
      );

      /*
        API already contains
        child_items recursively
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