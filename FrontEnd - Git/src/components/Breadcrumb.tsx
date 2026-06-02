import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getNavigation,
  NavItem,
} from "../lib/navigation";

import {
  findBreadcrumbTrail,
} from "../utils/breadcrumb";

export default function Breadcrumb() {

  const location =
    useLocation();

  const [trail, setTrail] =
    useState<NavItem[]>([]);

  useEffect(() => {

    async function loadBreadcrumb() {

      const menu =
        await getNavigation();

      const breadcrumb =
        findBreadcrumbTrail(
          menu,
          location.pathname
        );

      if (breadcrumb) {
        setTrail(breadcrumb);
      }
    }

    loadBreadcrumb();

  }, [location.pathname]);

  return (
    <nav className="breadcrumb">

      <ul className="breadcrumb-list">

        {/* Home */}

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        {/* Dynamic Trail */}

        {trail.map(
          (item, index) => {

            const isLast =
              index ===
              trail.length - 1;

            return (
              <li key={item.ID}>

                {isLast ? (
                  <span>
                    {item.title}
                  </span>
                ) : (
                  <Link to={item.url}>
                    {item.title}
                  </Link>
                )}

              </li>
            );
          }
        )}

      </ul>

    </nav>
  );
}
