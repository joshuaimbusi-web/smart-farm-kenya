import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, setUser, logout, remember, setRemember } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) throw new Error("Network response was not ok");
      
      const users = await res.json();
      const foundUser = users.find((u) => u.email === email);

      if (!foundUser) {
        setMessage({ 
          type: 'error',
          text: 'No account found with this email. Please check your email or sign up.'
        });
      } else if (!bcrypt.compareSync(password, foundUser.password)) {
        setMessage({ 
          type: 'error',
          text: 'Incorrect password. Please try again.'
        });
      } else {
        setUser(foundUser);
        setShowLogin(false);
        setMessage({
          type: 'success',
          text: `Welcome back, ${foundUser.name}! Redirecting to your dashboard...`
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Unable to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>🌾 Smart-Farm-Kenya</h1>
          <p>
            Streamline your farm operations with ease. Track planting,
            irrigation, and harvesting activities all in one place — simple,
            smart, and efficient farming for Kenya’s future.
          </p>

          {!user ? (
            <>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="hero-btn btn btn-primary"
              >
                {showLogin ? "Close Login" : "Login to Continue"}
              </button>

              {showLogin && (
                <form className="login-form" onSubmit={handleLogin}>
                  <h3>👩‍🌾 Farmer Login</h3>
                  {message.text && (
                    <div className={`message-alert ${message.type}`}>
                      {message.type === 'error' && '❌ '}
                      {message.type === 'success' && '✅ '}
                      {message.text}
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="remember-row">
                    <label className="remember">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                      />
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="submit" 
                    className={`login-btn btn btn-primary ${isLoading ? 'loading-btn' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              <p>
                Welcome back, <strong>{user.name}</strong> 👋
              </p>
              <NavLink to="/dashboard" className="hero-btn btn btn-primary">Go to Dashboard</NavLink>
              <button onClick={logout} className="logout-btn btn btn-danger">Logout</button>
              <NavLink to="/add" className="hero-btn btn btn-primary">Add New Activity</NavLink>
              <NavLink to="/add-product" className="newProduct-btn btn btn-primary">Add New Product</NavLink>
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
           <NavLink to="/about">About</NavLink>
           <NavLink to="/activities">Activities</NavLink>
           <NavLink to="/farm-products">Products</NavLink>
        </div>
      </footer>
    </div>
  );
}


