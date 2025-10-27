import { useEffect, useState } from "react";

export default function FarmProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/farmProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching farm products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const handleSell = async (product) => {
    try {
      const res = await fetch("http://localhost:3000/soldItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          soldDate: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to mark as sold: ${errText}`);
      }

      setProducts(products.filter((p) => p.id !== product.id));

      await fetch(`http://localhost:3000/farmProducts/${product.id}`, {
        method: "DELETE",
      });

      setMessage(`${product.name} sold successfully!`);
      setTimeout(() => setMessage(""), 2500);
    } catch (err) {
      console.error("Error selling product:", err);
      setMessage("Failed to sell product.");
    }
  };

  return (
    <div className="farm-products-container">
      <h1 className="farm-products-title">Farm Products for Sale</h1>
      <p className="farm-products-description">
        Browse our selection of fresh, organic, and farm-raised products straight from the farm.
      </p>

      {message && <p className="status-msg">{message}</p>}

      <div className="controls">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="filter-select">
          {categories.map((cat) => (
            <option key={cat} value={cat}> {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-text">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">
                  Ksh {product.price.toLocaleString()}
                </span>
                <button className="sell-btn" onClick={() => handleSell(product)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-products">No matching products found.</p>
      )}
    </div>
  );
}
