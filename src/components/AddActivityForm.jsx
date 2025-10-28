import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddActivityForm({ addActivity }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "",
    status: "",
    description: "",
    workers: ""
  });

  const navigate = useNavigate(); 

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const workersString = Array.isArray(formData.workers)
      ? formData.workers.join(", ")
      : formData.workers;

    const activityData = {
      ...formData,
      workers: workersString
        ? workersString.split(",").map((w) => w.trim())
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

        navigate("/");
      })
      .catch((err) => console.error("Add activity error:", err));
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

      <button type="submit" className="btn btn-primary btn-submit">
        Add Activity
      </button>
    </form>
  );
}
