import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/activities/${id}`)
      .then((res) => res.json())
      .then((data) => setActivity(data))
      .catch((err) => console.error("Error fetching activity:", err));
  }, [id]);

  if (!activity) return <p>Loading activity details...</p>;

  return (
    <div className="activity-details">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <h1>{activity.title}</h1>
      <p className="text-gray-600">{activity.date}</p>
      <p>{activity.description}</p>
      <p><strong>Type:</strong> {activity.type}</p>
      <p><strong>Status:</strong> {activity.status}</p>
      <p><strong>Duration:</strong> {activity.duration || "N/A"}</p>
      <p>
        <strong>Workers:</strong>{" "}
        {Array.isArray(activity.workers) ? activity.workers.join(", ") : "N/A"}
      </p>
    </div>
  );
}

