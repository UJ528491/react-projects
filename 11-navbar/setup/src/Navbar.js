import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const linksList = links;
  const socialList = social;
  const [showLinks, setShowLinks] = useState(false);
  const linksRef = useRef(null);
  const linksContainerRef = useRef(null);
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    linksContainerRef.current.style.height = `${showLinks ? linksHeight : 0}px`;
  }, [showLinks]);
  return (
    <>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <img src={logo} alt="logo" />
            <button
              className="nav-toggle"
              onClick={() => setShowLinks(!showLinks)}
            >
              <FaBars />
            </button>
          </div>
          <div className={"links-container"} ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              {linksList.map(item => {
                const { id, url, text } = item;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="social-icons">
            {socialList.map(item => {
              const { id, url, icon } = item;
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
