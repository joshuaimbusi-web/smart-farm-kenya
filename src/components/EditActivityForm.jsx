import { useState, useEffect } from "react";

export default function EditActivityForm({ activity, updateActivity }) {
  const [formData, setFormData] = useState(activity);

  useEffect(() => setFormData(activity), [activity]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedData = {
      ...formData,
      workers: typeof formData.workers === "string"
  ? formData.workers.split(",").map((w) => w.trim())
  : Array.isArray(formData.workers)
  ? formData.workers
  : [],
    };
  
    fetch(`http://localhost:3000/activities/${activity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updated) => {
        updateActivity(updated);
        alert("Activity updated successfully!");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h2>Edit Activity</h2>

      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <select name="type" value={formData.type} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="planting">Planting</option>
        <option value="irrigation">Irrigation</option>
        <option value="harvesting">Harvesting</option>
      </select>
      <input type="text" name="status" value={formData.status} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <input
        type="text"
        name="workers"
        value={Array.isArray(formData.workers) ? formData.workers.join(", ") : formData.workers}
        onChange={handleChange}
      />

      <button type="submit" className="btn-submit">Save Changes</button>
    </form>
  );
}

