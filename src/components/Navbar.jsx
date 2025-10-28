import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navRef = useRef(null);
  const userBtnRef = useRef(null);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    function handleOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    }

    function handleKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("click", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
  <nav className="navbar" ref={navRef}>
      <div className="navbar-left">
        <h1 className="logo">🌾 Smart-Farm-Kenya</h1>
      </div>

      <button
        className="menu-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div id="primary-navigation" className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/farm-products" onClick={() => setMenuOpen(false)}>Farm Products</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/activities" onClick={() => setMenuOpen(false)}>Activities</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/pests-and-diseases" onClick={() => setMenuOpen(false)}>Pests</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/localized-tips" onClick={() => setMenuOpen(false)}>Tips</NavLink>
        <NavLink className={({isActive})=> isActive? 'nav-link active' : 'nav-link'} to="/sold-items" onClick={() => setMenuOpen(false)}>Sold Items</NavLink>
      </div>

      <div className="auth-section">
        {user ? (
          <div className="user-area">
            <button
              ref={userBtnRef}
              className="user-btn"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="user-badge">👩‍🌾 {user?.name || "User"}</span>
              <span className="caret">▾</span>
            </button>

            {userMenuOpen && (
              <div className="user-dropdown" role="menu">
                <NavLink to="/dashboard" className="dropdown-item" onClick={() => { setUserMenuOpen(false); setMenuOpen(false); }}>Dashboard</NavLink>
                <NavLink to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>Profile</NavLink>
                <button className="dropdown-item logout-inline btn btn-danger" onClick={() => { setUserMenuOpen(false); handleLogout(); }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
              <NavLink to="/login" className="login-btn btn btn-primary">Login</NavLink>
              <NavLink to="/signup" className="signup-btn btn btn-ghost">Sign Up</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

