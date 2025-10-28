import { useNavigate } from "react-router-dom";
import ActivityForm from "./ActivityForm";

export default function AddActivityForm({ addActivity }) {
  const navigate = useNavigate();

  async function handleCreate(activity) {
    const res = await fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!res.ok) throw new Error("Failed to save activity");
    const saved = await res.json();
    addActivity(saved);
    navigate('/');
    return saved;
  }

  return <ActivityForm onSubmit={handleCreate} submitLabel="Add Activity" />;
}
