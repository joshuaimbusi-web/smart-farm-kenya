import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/activities');
  };

  return (
    <div className="activity-details activity-detail-page container">
      <button type="button" onClick={handleBack} className="back-link">← Back</button>

      <div className="activity-detail-card card">
        <h1 className="detail-title">{activity.title}</h1>

        <div className="activity-detail-meta">
          <p className="meta-row"><strong>Date:</strong> <span>{activity.date}</span></p>
          <p className="meta-row"><strong>Type:</strong> <span>{activity.type}</span></p>
          <p className="meta-row"><strong>Status:</strong> <span className="status">{activity.status}</span></p>
        </div>

        <div className="activity-detail-body">
          <p className="activity-description"><strong>Description:</strong> {activity.description}</p>

          {activity.workers?.length > 0 && (
            <div className="workers">
              <strong>Workers:</strong>
              <ul className="workers-list">
                {activity.workers.map((w) => (
                  <li key={w} className="worker-item">{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


