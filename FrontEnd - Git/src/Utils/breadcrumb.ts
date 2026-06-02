import { NavItem } from "../lib/navigation";

/*
-----------------------------------
Find Breadcrumb Trail
-----------------------------------
*/

export function findBreadcrumbTrail(
  items: NavItem[],
  currentUrl: string,
  parents: NavItem[] = []
): NavItem[] | null {

  for (const item of items) {

    /*
      Match Current URL
    */

    if (item.url === currentUrl) {
      return [...parents, item];
    }

    /*
      Search Child Items
    */

    if (
      item.child_items &&
      item.child_items.length > 0
    ) {
      const result =
        findBreadcrumbTrail(
          item.child_items,
          currentUrl,
          [...parents, item]
        );

      if (result) {
        return result;
      }
    }
  }

  return null;
}
