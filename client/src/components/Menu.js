import React from "react";
import { Link } from "react-router-dom";
import logoBI from "../assets/img/bi-b.png";
function Menu() {
  return (
    <aside
      className="menu"
      style={{ borderRight: "1px solid #045494", height: "100vh" }}
    >
      <img src={logoBI} style={{ paddingRight: "1em" }} />
      <h1 className="title" style={{ color: "#045494" }}>
        Monitor Bank
      </h1>
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <a style={{ color: "#045494" }}>Halaman Utama</a>
        </li>
        <li>
          <Link to="/add" style={{ color: "#045494" }}>
            Upload Data
          </Link>
        </li>

        <li>
          <Link to="/performance" style={{ color: "#045494" }}>
            Lihat Kineja
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
