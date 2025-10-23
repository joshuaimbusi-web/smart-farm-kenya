import { Link } from "react-router-dom";
import { FaCalendar, FaSeedling } from "react-icons/fa";


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