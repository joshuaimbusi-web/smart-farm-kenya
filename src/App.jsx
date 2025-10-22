import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ActivityDetails from "./pages/ActivityDetails";
import { useEffect, useState } from "react";
import "./index.css"; 

export default function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  function addActivity(newActivity) {
    setActivities([...activities, newActivity]);
  }

  function deleteActivity(id) {
    fetch(`http://localhost:3000/activities/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setActivities(activities.filter((a) => a.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  }

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              activities={activities}
              addActivity={addActivity}
              deleteActivity={deleteActivity}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/activities/:id" element={<ActivityDetails />} />
      </Routes>
    </div>
  );
}




