import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => {
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
          setUser(foundUser);
          setShowLogin(false);
          setError("");
          alert(`✅ Welcome back, ${foundUser.name}!`);
        } else {
          setError("❌ Invalid email or password");
        }
      })
      .catch(() => setError("⚠️ Server error. Please try again later."));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>🌾 Smart-Farm-Kenya</h1>
          <p>
            Streamline your farm operations with ease. Track planting,
            irrigation, and harvesting activities all in one place —
            simple, smart, and efficient farming for Kenya’s future.
          </p>

          {!user ? (
            <>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="hero-btn"
              >
                {showLogin ? "Close Login" : "Login to Continue"}
              </button>

              {showLogin && (
                <form className="login-form" onSubmit={handleLogin}>
                  <h3>👩‍🌾 Farmer Login</h3>
                  {error && <p className="error-msg">{error}</p>}
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <p>Welcome back, <strong>{user.name}</strong> 👋</p>
              <a href="/dashboard" className="hero-btn">
                Go to Dashboard
              </a>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>

              <a href="/add" className="hero-btn">Add New Activity</a>
              <a href="/add-product" className="newProduct-btn">Add New Product</a>
            </>
          )}
        </div>

        <div className="hero-images">
          <img src="/images/homey.jpg" alt="Field" />
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Smart-Farm-Kenya. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/activities">Activities</a>
          <a href="/farm-products">Products</a>
          <a href="mailto:info@smartfarmkenya.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}


