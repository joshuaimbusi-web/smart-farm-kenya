import React, { useState, useEffect } from "react";
import Loader from "../components/loader";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
    status: "Available",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/farmProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3000/farmProducts/${editingId}`
      : "http://localhost:3000/farmProducts";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts((prev) =>
        editingId
          ? prev.map((p) => (p.id === editingId ? newProduct : p))
          : [...prev, newProduct]
      );
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        image: "",
        status: "Available",
      });
      setEditingId(null);
    } else {
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`http://localhost:3000/farmProducts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await fetch(`http://localhost:3000/farmProducts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }
  };

  if (loading) return <Loader text="Loading your farm products..." />;

  return (
    <div className="farmer-dashboard">
      <h1 className="dashboard-title">Farmer Dashboard</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price (Ksh)" type="number" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Sold">Sold</option>
        </select>

        <button type="submit" className="save-btn">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="products-table">
        {products.map((p) => (
          <div key={p.id} className="product-row">
            <img src={p.image} alt={p.name} className="product-thumb" />
            <div className="product-details">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>
                Ksh {p.price} | {p.category} | Qty: {p.quantity}
              </p>
              <p>Status: <strong>{p.status}</strong></p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
              <select
                value={p.status}
                onChange={(e) => handleStatusChange(p.id, e.target.value)}
              >
                <option>Available</option>
                <option>Reserved</option>
                <option>Sold</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
