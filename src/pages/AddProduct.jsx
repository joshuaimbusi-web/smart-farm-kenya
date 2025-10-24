import { useState } from "react";

export default function AddProduct({ addProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      id: crypto.randomUUID(),
    };

    try {
      const res = await fetch("http://localhost:3000/farmProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to save product");

      addProduct(newProduct);
      setSuccess(true);
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  }

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Farm Product</h1>

      <form onSubmit={handleSubmit} className="add-product-form">
        <label>
          Product Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Animal Products">Animal Products</option>
            <option value="Cereals">Cereals</option>
          </select>
        </label>

        <label>
          Price (Ksh)
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        {/* <label>
          Image URL
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </label> */}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>

        {success && <p className="success-msg">✅ Product added successfully!</p>}
        {error && <p className="error-msg">❌ {error}</p>}
      </form>
    </div>
  );
}
