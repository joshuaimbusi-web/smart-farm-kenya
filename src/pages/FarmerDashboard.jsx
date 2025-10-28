import React, { useState, useEffect } from "react";
import Loader from "../components/loader";
import ProductForm from "../components/ProductForm";

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
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/farmProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(productData) {
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:3000/farmProducts/${editingId}` : 'http://localhost:3000/farmProducts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error('Failed to save product');
      const saved = await res.json();
      setProducts((prev) =>
        editingId ? prev.map((p) => (p.id === editingId ? saved : p)) : [...prev, saved]
      );
      setEditingId(null);
      setEditingProduct(null);
      return saved;
    } catch (err) {
      console.error('Save product error:', err);
      throw err;
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`http://localhost:3000/farmProducts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      (p.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (p.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || (p.status || "Available") === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: products.length,
    available: products.filter(p => (p.status || "Available") === "Available").length,
    reserved: products.filter(p => (p.status || "Available") === "Reserved").length,
    sold: products.filter(p => (p.status || "Available") === "Sold").length,
  };

  if (loading) return <Loader text="Loading your farm products..." />;

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h1>Farmer Dashboard</h1>
        <p className="dashboard-subtitle">Manage your farm products and inventory</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="stat-card available">
            <span className="stat-value">{stats.available}</span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat-card reserved">
            <span className="stat-value">{stats.reserved}</span>
            <span className="stat-label">Reserved</span>
          </div>
          <div className="stat-card sold">
            <span className="stat-value">{stats.sold}</span>
            <span className="stat-label">Sold</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="product-form-section">
          <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <ProductForm
            initialData={editingProduct}
            onSubmit={handleSave}
            submitLabel={editingId ? 'Update Product' : 'Add Product'}
          />
        </div>

        <div className="products-section">
          <div className="products-header">
            <h2>Product Inventory</h2>
            <div className="products-filters">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card dashboard-card">
                <img src={p.image} alt={p.name} className="product-image" />
                <div className="product-content">
                  <h3>{p.name}</h3>
                  <p className="product-description">{p.description}</p>
                  <div className="product-meta">
                    <span className="price">Ksh {p.price}</span>
                    <span className="quantity">Qty: {p.quantity}</span>
                    <span className={`status status-${(p.status || 'available').toLowerCase()}`}>
                      {p.status || 'Available'}
                    </span>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn btn-outline edit-btn"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger delete-btn"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-message">
              <span role="img" aria-label="empty">📦</span>
              <h3>No products found</h3>
              <p>Add new products or adjust your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
