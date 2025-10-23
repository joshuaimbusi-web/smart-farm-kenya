export default function FilterBar({ filter, setFilter, search, setSearch, sort, setSort }) {
  return (
    <div className="filter-bar">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Activities</option>
        <option value="planting">Planting</option>
        <option value="irrigation">Irrigation</option>
        <option value="harvesting">Harvesting</option>
      </select>

      <input
        type="text"
        placeholder="Search by title ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="status">By Status</option>
      </select>
    </div>
  );
}
