import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState([
    "all",
    ...new Set(items.map(menuItem => menuItem.category)),
  ]);
  const filterItems = category => {
    if (category === "all") {
      return setMenuItems(items);
    }
    const filteredMenu = items.filter(item => item.category === category);
    setMenuItems(filteredMenu);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories filterItems={filterItems} categories={categories} />
        <Menu menuItems={menuItems} />
      </section>
    </main>
  );
}

export default App;
