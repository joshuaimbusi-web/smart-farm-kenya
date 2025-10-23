import AddActivityForm from "../components/AddActivityForm";

export default function AddActivity({ addActivity }) {
  return (
    <div className="add-page">
      <h1 className="page-title">Add New Activity</h1>
      <AddActivityForm addActivity={addActivity} />
    </div>
  );
}
