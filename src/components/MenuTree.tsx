import { NavItem } from "../lib/navigation";

interface Props {
  items: NavItem[];
}

export default function MenuTree({
  items,
}: Props) {
  return (
    <ul className="menu-list">
      {items.map((item) => (
        <li
          key={item.ID}
          className="menu-item"
        >
          <a
            href={item.url}
            className="menu-link"
          >
            {item.title}
          </a>

          {item.child_items &&
            item.child_items.length >
              0 && (
              <div className="submenu">
                <MenuTree
                  items={
                    item.child_items
                  }
                />
              </div>
            )}
        </li>
      ))}
    </ul>
  );
}