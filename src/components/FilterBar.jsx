export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Activities</option>
        <option value="planting">Planting</option>
        <option value="irrigation">Irrigation</option>
        <option value="harvesting">Harvesting</option>
      </select>
    </div>
  );
}
