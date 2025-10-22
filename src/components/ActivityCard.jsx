import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <Link to={`/activities/${activity.id}`} className="activity-card">
      <div>
        <h3>{activity.title}</h3>
        <p className="date">{activity.date}</p>
        <p className="type">{activity.type}</p>
        <p className="status">{activity.status}</p>
      </div>
    </Link>
  );
}