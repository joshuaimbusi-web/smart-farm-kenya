import { Link } from "react-router-dom";
import { FaCalendar, FaSeedling, FaUsers } from "react-icons/fa";

export default function ActivityCard({ activity }) {
  const getStatusClass = (status) => {
    status = status.toLowerCase();
    if (status === "completed") return "status-completed";
    if (status === "in progress") return "status-progress";
    return "status-pending";
  };

  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case "planting":
        return "🌱";
      case "irrigation":
        return "💧";
      case "harvesting":
        return "🌾";
      default:
        return "🌿";
    }
  };

  return (
    <Link to={`/activities/${activity.id}`} className="activity-card">
      <div className="activity-card-content">
        <div className="activity-header">
          <span className="activity-icon">{getActivityIcon(activity.type)}</span>
          <span className={`status-badge ${getStatusClass(activity.status)}`}>
            {activity.status}
          </span>
        </div>
        
        <h3 className="activity-title">{activity.title}</h3>
        
        <div className="activity-details">
          <div className="detail-item">
            <FaCalendar className="detail-icon" />
            <span>{activity.date}</span>
          </div>
          
          <div className="detail-item">
            <FaSeedling className="detail-icon" />
            <span>{activity.type}</span>
          </div>

          {activity.workers?.length > 0 && (
            <div className="detail-item">
              <FaUsers className="detail-icon" />
              <span>{activity.workers.length} workers</span>
            </div>
          )}
        </div>

        <p className="activity-description">{activity.description}</p>
        
        <span className="view-details">
          View Details →
        </span>
      </div>
    </Link>
  );
}