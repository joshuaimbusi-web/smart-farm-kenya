import ActivityList from "../components/ActivityList";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

export default function Activities({ activities, deleteActivity }) {
  const [filter, setFilter] = useState("all");

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  return (
    <div className="activities-page">
      <h1 className="page-title">All Farm Activities</h1>

      <FilterBar filter={filter} setFilter={setFilter} />

      <ActivityList
        activities={filteredActivities}
        deleteActivity={deleteActivity}
      />
    </div>
  );
}
