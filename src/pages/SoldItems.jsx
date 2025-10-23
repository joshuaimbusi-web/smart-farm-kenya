import { useEffect, useState } from "react";

export default function SoldItems() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/soldItems")
      .then((res) => res.json())
      .then((data) => setSoldItems(data))
      .catch((err) => console.error("Error fetching sold items:", err));
  }, []);

  return (
    <div className="farm-products-container">
      <h1 className="farm-products-title">Sold Products</h1>

      {soldItems.length === 0 ? (
        <p className="no-products">No products have been sold yet.</p>
      ) : (
        <div className="products-grid">
          {soldItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{item.name}</h2>
                <p className="product-text">{item.description}</p>
                <div className="product-footer">
                  <span className="product-price">
                    Sold for Ksh {item.price.toLocaleString()}
                  </span>
                  <small className="sold-date">
                    Sold on {new Date(item.soldDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
