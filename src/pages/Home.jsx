import ActivityList from "../components/ActivityList";
import AddActivityForm from "../components/AddActivityForm";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

export default function Home({ activities, addActivity }) {
  const [filter, setFilter] = useState("all");

  const filteredActivities =
    filter === "all" ? activities : activities.filter((a) => a.type === filter);

  return (
    <div className="home">
      <h1>Daily Farm Activities</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="activity-list">
        <ActivityList activities={filteredActivities} />
      </div>
      <AddActivityForm addActivity={addActivity} />
    </div>
  );
}
