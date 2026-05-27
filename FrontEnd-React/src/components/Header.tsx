import { useEffect, useState } from "react";

import "./header.css";

import MenuTree from "./MenuTree";

import { getNavigation } from "../lib/navigation";

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