import ActivityList from "../components/ActivityList";
import FilterBar from "../components/FilterBar";
import EditActivityForm from "../components/EditActivityForm"; 
import { useState } from "react";

export default function Activities({ activities, deleteActivity, updateActivity }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");       
  const [sort, setSort] = useState("date-desc");  
  const [editingActivity, setEditingActivity] = useState(null); 

  const filteredActivities = activities
    .filter(a => filter === "all" || a.type === filter)
    .filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.worker?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  function handleEdit(activity) {
    setEditingActivity(activity);
  }

  function handleUpdate(updatedActivity) {
    updateActivity(updatedActivity);
    setEditingActivity(null);
  }

  return (
    <div className="activities-page">
      <h1 className="page-title">All Farm Activities</h1>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {editingActivity ? (
        <EditActivityForm
          activity={editingActivity}
          updateActivity={handleUpdate}
        />
      ) : (
        <ActivityList
          activities={filteredActivities}
          deleteActivity={deleteActivity}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
