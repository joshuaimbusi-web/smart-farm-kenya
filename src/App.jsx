import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ActivityDetails from "./pages/ActivityDetails";
import { useEffect, useState } from "react";
import "./index.css";
import AddActivity from "./pages/AddActivity";
import Activities from "./pages/Activities";
import FarmProducts from "./pages/FarmProducts";
import AddProduct from "./pages/AddProduct";
import SoldItems from "./pages/SoldItems";
import Dashboard from "./pages/FarmerDashboard";
import PestsAndDiseases from "./pages/PestsAndDiseases";
import LocalizedTips from "./pages/LocalizedTips";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [activities, setActivities] = useState([]);
  const [farmProducts, setFarmProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3000/activities")
      .then((res) => res.json())
      .then(setActivities)
      .catch((err) => console.error("Error loading activities:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/farmProducts")
      .then((res) => res.json())
      .then(setFarmProducts)
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  function addProduct(newProduct) {
    setFarmProducts([...farmProducts, newProduct]);
  }

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

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Activities activities={activities} deleteActivity={deleteActivity} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddActivity addActivity={addActivity} />
            </ProtectedRoute>
          }
        />

        <Route path="/activities/:id" element={<ProtectedRoute><ActivityDetails /></ProtectedRoute>} />
        <Route path="/farm-products" element={<ProtectedRoute><FarmProducts /></ProtectedRoute>} />
        <Route path="/add-product" element={<ProtectedRoute><AddProduct addProduct={addProduct} /></ProtectedRoute>} />
        <Route path="/sold-items" element={<ProtectedRoute><SoldItems /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pests-and-diseases" element={<ProtectedRoute><PestsAndDiseases /></ProtectedRoute>} />
        <Route path="/localized-tips" element={<ProtectedRoute><LocalizedTips /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
