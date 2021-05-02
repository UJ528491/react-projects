import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import data from "./data";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  const displaySubmenu = e => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const btnCenter = (tempBtn.left + tempBtn.right) / 2;
    const btnBottom = tempBtn.bottom - 3;
    const location = { btnCenter, btnBottom };
    openSubmenu(page, location);
  };
  const handleSubmenu = e => {
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className="nav-logo" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {data.map((list, index) => (
            <li key={index}>
              <button className="link-btn" onMouseOver={displaySubmenu}>
                {list.page}
              </button>
            </li>
          ))}
        </ul>
        <button className="btn signin-btn">sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
