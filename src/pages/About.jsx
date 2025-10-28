export default function About() {
  const features = [
    {
      icon: "🌾",
      title: "Farm Management",
      description: "Track and organize all your farming activities efficiently"
    },
    {
      icon: "📊",
      title: "Production Tracking",
      description: "Monitor crop yields and livestock production with ease"
    },
    {
      icon: "🌡️",
      title: "Weather Integration",
      description: "Get localized weather updates for better planning"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your farm data anywhere, anytime"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Smart-Farm-Kenya</h1>
        <p className="about-lead">
          Empowering Kenyan farmers with modern technology to enhance productivity
          and streamline farm operations.
        </p>
      </div>

      <div className="about-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To revolutionize farming in Kenya by providing accessible, easy-to-use
          technology that helps farmers make data-driven decisions, increase
          yields, and improve their livelihoods.
        </p>
      </div>

      <div className="tech-stack">
        <h2>Built with Modern Technology</h2>
        <div className="tech-list">
          <span>React</span>
          <span>Node.js</span>
          <span>REST API</span>
          <span>Real-time Updates</span>
        </div>
      </div>
    </div>
  );
}
