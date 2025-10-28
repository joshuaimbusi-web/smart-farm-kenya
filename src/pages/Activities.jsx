import ActivityList from "../components/ActivityList";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

export default function Activities({ activities, deleteActivity }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");

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

  const stats = {
    total: activities.length,
    completed: activities.filter(a => a.status.toLowerCase() === "completed").length,
    inProgress: activities.filter(a => a.status.toLowerCase() === "in progress").length,
    pending: activities.filter(a => a.status.toLowerCase() === "pending").length
  };

  return (
    <div className="activities-page">
      <div className="activities-header">
        <h1 className="page-title">Farm Activities</h1>
        <p className="activities-subtitle">Track and manage all your farming operations</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Activities</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card in-progress">
            <span className="stat-value">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <ActivityList
        activities={filteredActivities}
        deleteActivity={deleteActivity}
      />
      
      {filteredActivities.length === 0 && (
        <div className="empty-message">
          <span role="img" aria-label="empty">📝</span>
          <h3>No activities found</h3>
          <p>Try adjusting your filters or add a new activity</p>
        </div>
      )}
    </div>
  );
}
