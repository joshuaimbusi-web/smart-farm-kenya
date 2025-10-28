import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("✅ Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🌾 Smart-Farm-Kenya</h1>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/farm-products">Farm Products</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/pests-and-diseases">Pests</NavLink>
        <NavLink to="/localized-tips">Tips</NavLink>
        <NavLink to="/sold-items">Sold Items</NavLink>
      </div>

      <div className="auth-section">
        {user ? (
          <>
            <span className="user-badge">👩‍🌾 {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <NavLink to="/login" className="login-btn">
              Login
            </NavLink>
            <NavLink to="/signup" className="signup-btn">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
