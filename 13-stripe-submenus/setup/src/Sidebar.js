import React from "react";
import { FaTimes } from "react-icons/fa";
import sublinks from "./data";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <aside className="sidebar">
        <button className="close-btn">
          <FaTimes />
        </button>
        <div className="sidebar-links"></div>
      </aside>
    </div>
  );
};

export default Sidebar;
