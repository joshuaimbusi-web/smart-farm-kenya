import { useEffect, useState } from "react";

export default function PestsAndDiseases() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("http://localhost:3000/pestsAndDiseases")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching pest data:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(
    (item) =>
      (filter === "all" || item.crop.toLowerCase() === filter.toLowerCase()) &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.crop.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p className="loading">Loading pests and diseases...</p>;

  const crops = ["all", ...new Set(data.map((item) => item.crop))];

  return (
    <div className="pest-disease-page">
      <h1 className="page-title">🌿 Pests & Diseases Information</h1>
      <p className="page-subtitle">
        Learn how to identify, prevent, and control common farm problems.
      </p>

      <div className="controls">
        <input
          type="text"
          placeholder="Search pest or disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          {crops.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="info-grid">
        {filtered.map((item) => (
          <div key={item.id} className="info-card">
            <img
              src={item.image}
              alt={item.name}
              className="info-image"
              loading="lazy"
            />
            <div className="info-content">
              <h3>{item.name}</h3>
              <p><strong>Crop:</strong> {item.crop}</p>
              <p><strong>Symptoms:</strong> {item.symptoms}</p>
              <p><strong>Prevention:</strong> {item.prevention}</p>
              <p><strong>Control:</strong> {item.control}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-results">No results found for your search.</p>
      )}
    </div>
  );
}
