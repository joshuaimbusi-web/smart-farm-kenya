import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ActivityDetails from "./pages/ActivityDetails";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  function addActivity(newActivity) {
    setActivities([...activities, newActivity]); // ✅ required state update
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home activities={activities} addActivity={addActivity} />}
        />
        <Route path="/activities/:id" element={<ActivityDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

