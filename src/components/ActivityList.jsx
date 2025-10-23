import { Link } from "react-router-dom";

export default function ActivityList({ activities, deleteActivity, onEdit }) {
  return (
    <div className="activity-list">
      {activities.length === 0 ? (
        <p className="empty-message">No activities found.</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-info">
              <h2 className="activity-title">{activity.title}</h2>
              <p className="activity-date">{activity.date}</p>
              <p className="activity-description">{activity.description}</p>
              <p className="activity-meta">Type: {activity.type}</p>
              <p className={`activity-meta status ${activity.status}`}>
                Status: {activity.status}
              </p>

              <Link to={`/activities/${activity.id}`} className="activity-link">
                View Details →
              </Link>
            </div>

            <div className="card-actions">
              <button onClick={() => onEdit(activity)} className="edit-btn">edit</button>
              <button onClick={() => deleteActivity(activity.id)} className="delete-btn">delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}



