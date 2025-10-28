import { useEffect, useState } from "react";

export default function LocalizedTips() {
  const [region, setRegion] = useState("");
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/regionalTips")
      .then((res) => res.json())
      .then(setTips)
      .catch((err) => console.error("Error loading regional tips:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleRegionChange = (e) => setRegion(e.target.value);

  const regions = [
    { value: "Highlands", icon: "🏔️" },
    { value: "Midlands", icon: "⛰️" },
    { value: "Lowlands", icon: "🌅" },
    { value: "Coastal", icon: "🌊" },
    { value: "Lake Basin", icon: "💧" }
  ];

  const filtered = tips.filter(
    (t) => {
      const matchesRegion = region === "" || t.region.toLowerCase() === region.toLowerCase();
      const matchesSearch = searchTerm === "" || 
        t.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.recommendation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRegion && matchesSearch;
    }
  );

  const tipsByRegion = regions.map(r => ({
    ...r,
    count: tips.filter(t => t.region === r.value).length
  }));

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading farming tips...</p>
    </div>
  );

  return (
    <div className="localized-tips">
      <div className="tips-header">
        <h1>🌦️ Localized Farming Tips</h1>
        <p className="tips-subtitle">
          Get region-specific recommendations for better farming practices
        </p>
      </div>

      <div className="region-selector">
        {tipsByRegion.map(r => (
          <button
            key={r.value}
            className={`region-btn ${region === r.value ? 'active' : ''}`}
            onClick={() => setRegion(r.value === region ? "" : r.value)}
          >
            <span className="region-icon">{r.icon}</span>
            <span className="region-name">{r.value}</span>
            <span className="region-count">{r.count} tips</span>
          </button>
        ))}
      </div>

      <div className="tips-toolbar">
        <input
          type="text"
          placeholder="Search by crop or issue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="tips-search"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="tips-grid">
          {filtered.map((tip) => (
            <div key={tip.id} className="tip-card">
              <div className="tip-header">
                <span className="tip-region">{tip.region}</span>
                <span className="tip-crop">{tip.crop}</span>
              </div>
              
              <h3 className="tip-issue">{tip.issue}</h3>
              
              <div className="tip-content">
                <h4>Recommendation:</h4>
                <p>{tip.recommendation}</p>
              </div>
              
              <div className="tip-footer">
                <span className="tip-tag">#{tip.crop.toLowerCase()}</span>
                <span className="tip-tag">#{tip.region.toLowerCase()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span role="img" aria-label="empty">🌱</span>
          <h3>No tips found</h3>
          <p>{region ? "Try selecting a different region" : "Select a region to view farming tips"}</p>
        </div>
      )}
    </div>
  );
}
