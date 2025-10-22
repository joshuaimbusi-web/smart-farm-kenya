import { useState } from "react";

export default function AddActivityForm({ addActivity }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "",
    status: "",
    description: "",
    workers: "" 
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const activityData = {
      ...formData,
      workers: formData.workers
        ? formData.workers.split(",").map((w) => w.trim())
        : []
    };

    const configObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData)
    };

    fetch("http://localhost:3000/activities", configObj)
      .then((res) => res.json())
      .then((newActivity) => {
        addActivity(newActivity); 
        setFormData({
          title: "",
          date: "",
          type: "",
          status: "",
          description: "",
          workers: ""
        }); 
      });
  }

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h2>Add New Activity</h2>

      <input
        type="text"
        name="title"
        placeholder="Activity Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="">Select Type</option>
        <option value="planting">Planting</option>
        <option value="irrigation">Irrigation</option>
        <option value="harvesting">Harvesting</option>
      </select>

      <input
        type="text"
        name="status"
        placeholder="Status (e.g., Completed)"
        value={formData.status}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      <input
        type="text"
        name="workers"
        placeholder="Workers (comma separated, e.g., John, Mary)"
        value={formData.workers}
        onChange={handleChange}
      />

      <button type="submit" className="btn-submit">
        Add Activity
      </button>
    </form>
  );
}

