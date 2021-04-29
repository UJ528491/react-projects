import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import data from "./data";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" className="nav-logo" />
          <button className="btn toggle-btn">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {data.map(list => (
            <li>
              <button className="link-btn">{list.page}</button>
            </li>
          ))}
        </ul>
        <button className="btn signin-btn">sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
