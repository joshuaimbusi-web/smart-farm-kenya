import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🌾 Smart-Farm-Kenya</h1>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>

        <NavLink to="/activities" className={({ isActive }) => (isActive ? "active" : "")}>
          Activities
        </NavLink>

        <NavLink to="/farm-products" className={({ isActive }) => (isActive ? "active" : "")}>
          Farm Products
        </NavLink>

        <NavLink to="/dashboard">Dashboard</NavLink>
  </div>
        <li><a href="/sold-items">Sold Items</a></li>
        <li><a href="/pests-and-diseases">Pests & Diseases</a></li>
        <li><a href="/localized-tips">Localized Tips</a></li>

    </nav>
  );
}


