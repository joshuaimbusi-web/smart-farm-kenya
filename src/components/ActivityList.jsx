import ActivityCard from "./ActivityCard";

export default function ActivityList({ activities }) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

