import { useEffect, useState } from "react";
import Loader from "../components/loader.js";

export default function SoldItems() {
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/soldItems")
      .then((res) => res.json())
      .then((data) => setSoldItems(data))
      .catch((err) => console.error("Error fetching sold items:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading sold items..." />;

  const filteredItems = soldItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(soldItems.map((i) => i.category))];

  return (
    <div className="sold-items-container">
      <h1 className="sold-items-title">Sold Items</h1>
      <p className="sold-items-description">
        A record of all items sold from the farm.
      </p>

      <div className="controls">
        <input
          type="text"
          placeholder="Search sold items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
            )}
            <div className="product-info">
              <h2 className="product-name">{item.name}</h2>
              <p className="product-text">{item.description}</p>
              <div className="product-footer">
                <span className="product-price">
                  Ksh {item.price.toLocaleString()}
                </span>
                <span className="sold-date">
                  Sold on:{" "}
                  {new Date(item.soldDate).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="no-products">No matching sold items found.</p>
      )}
    </div>
  );
}
