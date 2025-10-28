import { useState, useEffect } from 'react';

export default function ProductForm({ initialData = null, onSubmit, submitLabel = 'Save', showImagePreview = true }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    status: 'Available'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) setForm({ ...form, ...initialData });
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { ...form, price: Number(form.price) };
      const saved = await onSubmit(payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      return saved;
    } catch (err) {
      setError(err?.message || String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <label>
        Product Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Animal Products">Animal Products</option>
          <option value="Cereals">Cereals</option>
        </select>
      </label>

      <label>
        Price (Ksh)
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>

      <label>
        Image URL
        <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
      </label>

      <label>
        Status
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Sold">Sold</option>
        </select>
      </label>

      {showImagePreview && form.image && (
        <div style={{ textAlign: 'center' }}>
          <img src={form.image} alt="preview" style={{ maxWidth: '180px', borderRadius: 8, margin: '0.5rem auto' }} />
        </div>
      )}

      <button type="submit" className="submit-btn btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>

      {success && <p className="success-msg">✅ Saved successfully</p>}
      {error && <p className="error-msg">❌ {error}</p>}
    </form>
  );
}
