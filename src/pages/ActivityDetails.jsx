import { useParams, Link } from "react-router-dom";
import activitiesData from "../data/activities.json";

export default function ActivityDetails() {
  const { id } = useParams();
  const activity = activitiesData.find((a) => a.id.toString() === id);

  if (!activity) return <p>Activity not found.</p>;

  return (
    <div className="activity-details">
      <Link to="/" className="back-link">← Back</Link>
      <h1>{activity.title}</h1>
      <p className="text-gray-600">{activity.date}</p>
      <p>{activity.description}</p>
      <p><strong>Type:</strong> {activity.type}</p>
      <p><strong>Status:</strong> {activity.status}</p>
      <p><strong>Duration:</strong> {activity.duration}</p>
      <p><strong>Workers:</strong> {activity.workers.join(", ")}</p>
    </div>
  );
}
