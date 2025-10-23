import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ActivityDetails from "./pages/ActivityDetails";
import { useEffect, useState } from "react";
import "./index.css";
import AddActivity from "./pages/AddActivity";
import Activities from "./pages/Activities";



export default function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/activities")
      .then((res) => res.json())
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function addActivity(newActivity) {
    setActivities([...activities, newActivity]);
  }

  function deleteActivity(id) {
    fetch(`http://localhost:3000/activities/${id}`, {
      method: "DELETE",
    })
      .then(() => setActivities(activities.filter((a) => a.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  }

  function updateActivity(updated) {
    setActivities((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  }

  if (loading) return <p className="loading">Loading activities...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="app-container">
      <Navbar />
     <Routes>
  <Route
    path="/"
    element={<Home />}
  />
  <Route
    path="/activities"
    element={
      <Activities
        activities={activities}
        deleteActivity={deleteActivity}
      />
    }
  />
  <Route path="/add" element={<AddActivity addActivity={addActivity} />} />
  <Route path="/about" element={<About />} />
  <Route path="/activities/:id" element={<ActivityDetails />} />
</Routes>

    </div>
  );
}




