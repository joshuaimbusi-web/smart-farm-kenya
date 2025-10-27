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

export default function App() {
  const [activities, setActivities] = useState([]);
  const [farmProducts, setFarmProducts] = useState([]);

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
        <Route
          path="/activities"
          element={
            <Activities activities={activities} deleteActivity={deleteActivity} />
          }
        />
        <Route path="/add" element={<AddActivity addActivity={addActivity} />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities/:id" element={<ActivityDetails />} />
        <Route path="/farm-products" element={<FarmProducts />} />
        <Route path="/add-product" element={<AddProduct addProduct={addProduct} />} />
        <Route path="/sold-items" element={<SoldItems />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pests-and-diseases" element={<PestsAndDiseases />} />
        <Route path="/localized-tips" element={<LocalizedTips />} />
      </Routes>
    </div>
  );
}





