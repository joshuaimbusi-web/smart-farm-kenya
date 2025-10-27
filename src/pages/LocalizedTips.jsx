import { useEffect, useState } from "react";

export default function LocalizedTips() {
  const [region, setRegion] = useState("");
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/regionalTips")
      .then((res) => res.json())
      .then(setTips)
      .catch((err) => console.error("Error loading regional tips:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleRegionChange = (e) => setRegion(e.target.value);

  const filtered = tips.filter(
    (t) => region === "" || t.region.toLowerCase() === region.toLowerCase()
  );

  return (
    <div className="localized-tips">
      <h1>🌦️ Localized Farming Tips</h1>
      <p>Select your region to get pest & disease recommendations:</p>

      <select value={region} onChange={handleRegionChange}>
        <option value="">-- Select Region --</option>
        <option value="Highlands">Highlands</option>
        <option value="Midlands">Midlands</option>
        <option value="Lowlands">Lowlands</option>
        <option value="Coastal">Coastal</option>
        <option value="Lake Basin">Lake Basin</option>
      </select>

      {loading && <p>Loading tips...</p>}

      <div className="tips-grid">
        {filtered.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h3>{tip.title}</h3>
            <p><strong>Crop:</strong> {tip.crop}</p>
            <p><strong>Issue:</strong> {tip.issue}</p>
            <p><strong>Recommendation:</strong> {tip.recommendation}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <p className="no-results">Select a region to view tips.</p>
      )}
    </div>
  );
}
