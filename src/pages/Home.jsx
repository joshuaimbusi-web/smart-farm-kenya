import ActivityList from "../components/ActivityList";
import AddActivityForm from "../components/AddActivityForm";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

export default function Home({ activities, addActivity, deleteActivity }) {
  const [filter, setFilter] = useState("all");

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  return (
    <div className="home-container">
      <h1 className="page-title">Daily Farm Activities</h1>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ActivityList
        activities={filteredActivities}
        deleteActivity={deleteActivity}
      />
      <AddActivityForm addActivity={addActivity} />
    </div>
  );
}


