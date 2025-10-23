import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/activities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Activity not found");
        return res.json();
      })
      .then(setActivity)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activity) return <p>Activity not found</p>;

  return (
    <div className="activity-details">
      <Link to="/" className="back-link">← Back</Link>
      <h1>{activity.title}</h1>
      <p><strong>Date:</strong> {activity.date}</p>
      <p><strong>Type:</strong> {activity.type}</p>
      <p><strong>Status:</strong> {activity.status}</p>
      <p><strong>Description:</strong> {activity.description}</p>

      {activity.workers?.length > 0 && (
        <div>
          <strong>Workers:</strong>
          <ul>
            {activity.workers.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}


