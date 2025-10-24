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
          <a href="/add" className="hero-btn">
            Add New Activity
          </a>
        </div>

        <div className="hero-images">
          <img src="/images/homep.jpg" alt="Farm" />
          <img src="/images/home.jpg" alt="Field" />
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Plan</h3>
            <p>Record your upcoming planting, irrigation, or harvest schedules.</p>
          </div>
          <div className="step">
            <h3>2. Manage</h3>
            <p>Track all your activities and resources from one dashboard.</p>
          </div>
          <div className="step">
            <h3>3. Harvest & Sell</h3>
            <p>Sell your farm produce directly through the marketplace.</p>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Farm Products</h2>
        <a href="/add-product" className="newProduct-btn">
            Add New Product
          </a>
        <div className="product-list">
          <div className="product-card">
            <img src="/images/maize.jpg" alt="Maize" />
            <h3>Fresh Maize</h3>
            <p>Organically grown maize from our demo farm in Eldoret.</p>
          </div>
          <div className="product-card">
            <img src="/images/homey.jpg" alt="Vegetable" />
            <h3>Vegetables</h3>
            <p>Farm fresh vegetables grown Organically.</p>
          </div>
        </div>
      </section>

      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="member">
            <h3>Joshua Imbusi</h3>
            <p>Founder & Lead Developer</p>
          </div>
          <div className="member">
            <h3>Martha Khatsenzia</h3>
            <p>Marketing & Partnerships</p>
          </div>
          <div className="member">
            <h3>Meshack Shikanga</h3>
            <p>Farm Operations Specialist</p>
          </div>
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


