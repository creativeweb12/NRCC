import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import axios from "axios";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

export function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

   const [menu, setMenu] =
  useState<any[]>([]);

  /*
  -----------------------------
  Fetch WordPress Menu
  -----------------------------
  */

useEffect(() => {

  async function fetchMenu() {

    try {

      const response =
        await axios.get(
          "https://creativewebgraphic.com/nrccwordpress/wp-json/wp-menus/v1/menus/Header"
        );

      console.log(
        "MENU RESPONSE:",
        response.data
      );

      /*
      --------------------------------
      Fix API Response Structure
      --------------------------------
      */

      if (
        Array.isArray(
          response.data
        )
      ) {

        setMenu(
          response.data
        );

      } else if (
        response.data &&
        response.data.items
      ) {

        setMenu(
          response.data.items
        );

      }

    } catch (error) {

      console.error(
        "MENU API ERROR:",
        error
      );

    }

  }

  fetchMenu();

}, []);

  /*
  -----------------------------
  Normalize URL
  -----------------------------
  */

  const normalizeUrl = (
    url
  ) => {

    if (!url) return "/";

    return url
      .replace(
        "https://creativewebgraphic.com/nrccwordpress",
        ""
      )
      .replace(/\/$/, "") || "/";

  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-primary text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">

            {menu.map((item) => (

              <Link
                key={item.ID}
                to={
                  normalizeUrl(
                    item.url
                  )
                }
                className="font-medium hover:text-saffron"
              >
                {item.title}
              </Link>

            ))}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="ml-auto text-3xl lg:hidden"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (

        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setMobileOpen(false)
            }
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-72 overflow-y-auto bg-white p-6 shadow-2xl">

            {/* Drawer Header */}
            <div className="mb-6 flex items-center justify-between border-b pb-4">

              <h2 className="text-2xl font-bold text-black">
                Menu
              </h2>

              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="text-3xl text-black"
              >
                <FaTimes />
              </button>

            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col space-y-5">

              {menu.length > 0 ? (

                menu.map((item) => (

                  <Link
                    key={item.ID}
                    to={
                      normalizeUrl(
                        item.url
                      )
                    }
                    className="text-lg font-medium text-black hover:text-saffron"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    {item.title}
                  </Link>

                ))

              ) : (

                <p className="text-gray-500">
                  Loading menu...
                </p>

              )}

            </nav>

          </div>

        </div>
      )}
    </>
  );
}