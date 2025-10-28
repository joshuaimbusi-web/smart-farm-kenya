import { useState, useEffect } from 'react';

export default function ActivityForm({ initialData = null, onSubmit, submitLabel = 'Add Activity' }) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    type: '',
    status: '',
    description: '',
    workers: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) setForm({ ...form, ...initialData, workers: Array.isArray(initialData.workers) ? initialData.workers.join(', ') : initialData.workers || '' });
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
      const workersString = Array.isArray(form.workers) ? form.workers.join(', ') : form.workers;
      const payload = {
        ...form,
        workers: workersString ? workersString.split(',').map(w => w.trim()) : []
      };
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
    <form onSubmit={handleSubmit} className="activity-form">
      <h2>{submitLabel}</h2>

      <label>
        Activity Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Date
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
      </label>

      <label>
        Type
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="planting">Planting</option>
          <option value="irrigation">Irrigation</option>
          <option value="harvesting">Harvesting</option>
        </select>
      </label>

      <label>
        Status
        <input name="status" value={form.status} onChange={handleChange} placeholder="Status (e.g., Completed)" />
      </label>

      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>

      <label>
        Workers (comma separated)
        <input name="workers" value={form.workers} onChange={handleChange} placeholder="John, Mary" />
      </label>

      <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>

      {success && <p className="success-msg">✅ Activity saved</p>}
      {error && <p className="error-msg">❌ {error}</p>}
    </form>
  );
}
