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

        <NavLink to="/add-product" className={({ isActive }) => (isActive ? "active" : "")}>
          Add Product
        </NavLink>

        <NavLink to="/sold-items" className={({ isActive }) => (isActive ? "active" : "")}>
          Sold Items
        </NavLink>


        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
      </div>
    </nav>
  );
}


