import { useEffect, useState } from "react";

import "./header.css";

import MenuTree from "./MenuTree";

import { getNavigation } from "../lib/navigation";

import { Link } from "react-router-dom";


const WORDPRESS_URL =
  "https://creativewebgraphic.com/nrccwordpress";

function normalizeUrl(url: string) {
  if (!url) return "/";

  return (
    url
      .replace(WORDPRESS_URL, "")
      .replace(/\/$/, "") || "/"
  );
}


interface MenuItem {
  ID: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

export default function Header() {
  const [menu, setMenu] = useState<
    MenuItem[]
  >([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items =
        await getNavigation();

      setMenu(items || []);
    } catch (error) {
      console.error(
        "Failed to load menu:",
        error
      );
    }
  };
  
  console.log(menu);

  return (
    <header className="header">
      <nav className="main-nav">
        <MenuTree items={menu} />
      </nav>
    </header>
  );
}