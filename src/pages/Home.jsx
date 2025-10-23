export default function Home() {
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
          <a href="/add" className="hero-btn">
            Add New Activity
          </a>
        </div>

        <div className="hero-images">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80"
            alt="Farm field"
          />
          <img
            src="https://images.unsplash.com/photo-1602526432604-b4856e469b97?auto=format&fit=crop&w=700&q=80"
            alt="Farmers working"
          />
        </div>
      </section>
      <section className="marketing-section">
        <h2>Why Choose Smart-Farm-Kenya?</h2>
        <p className="marketing-intro">
          Smart-Farm-Kenya helps farmers manage daily activities, track resources,
          and make informed decisions for a more efficient and profitable farm.
        </p>
        
      </section>
    </div>
  );
}

