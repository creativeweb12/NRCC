/*
-----------------------------------
WordPress GraphQL URL
-----------------------------------
*/

const GRAPHQL_URL =
  "https://creativewebgraphic.com/nrccwordpress/graphql";

/*
-----------------------------------
Menu Item Interface
-----------------------------------
*/

export interface MenuItem {

  id: string;

  title: string;

  url: string;

  parentId?: string | null;

  child_items: MenuItem[];
}

/*
-----------------------------------
Fetch Sidebar Menu
-----------------------------------
*/

export async function getSidebarMenu(
  menuSlug: string
): Promise<MenuItem[]> {

  try {

    /*
    -----------------------------------
    GraphQL Query
    -----------------------------------
    */

    const query = `
      query GetSidebarMenu($id: ID!) {

        menu(
          id: $id,
          idType: SLUG
        ) {

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

    /*
    -----------------------------------
    Fetch GraphQL
    -----------------------------------
    */

    const response =
      await fetch(
        GRAPHQL_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            query,

            variables: {
              id: menuSlug,
            },
          }),
        }
      );

    /*
    -----------------------------------
    Convert JSON
    -----------------------------------
    */

    const result =
      await response.json();

    console.log(
      "GRAPHQL MENU RESULT:",
      result
    );

    /*
    -----------------------------------
    Extract Menu Nodes
    -----------------------------------
    */

    const items =
      result?.data?.menu
        ?.menuItems?.nodes || [];

    console.log(
      "GRAPHQL MENU ITEMS:",
      items
    );

    /*
    -----------------------------------
    Empty Menu
    -----------------------------------
    */

    if (!items.length) {

      return [];
    }

    /*
    -----------------------------------
    Build Menu Map
    -----------------------------------
    */

    const menuMap:
      Record<
        string,
        MenuItem
      > = {};

    const rootItems:
      MenuItem[] = [];

    /*
    -----------------------------------
    Normalize Items
    -----------------------------------
    */

    items.forEach(
      (item: any) => {

        menuMap[item.id] = {

          id: item.id,

          title:
            item.label,

          url:
            item.path,

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
          menuMap[item.id];

        /*
        -----------------------------------
        Child Item
        -----------------------------------
        */

        if (
          item.parentId &&
          menuMap[
            item.parentId
          ]
        ) {

          menuMap[
            item.parentId
          ].child_items.push(
            menuItem
          );

        } else {

          /*
          -----------------------------------
          Root Item
          -----------------------------------
          */

          rootItems.push(
            menuItem
          );
        }
      }
    );

    console.log(
      "FINAL MENU TREE:",
      rootItems
    );

    /*
    -----------------------------------
    Return Nested Menu
    -----------------------------------
    */

    return rootItems;

  } catch (error) {

    console.error(
      "GraphQL Menu Error:",
      error
    );

    return [];
  }
}
