export default function Home() {
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
          <a href="/add" className="hero-btn">Add New Activity</a>

          <a href="/add-product" className="newProduct-btn">Add New Product</a>
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


