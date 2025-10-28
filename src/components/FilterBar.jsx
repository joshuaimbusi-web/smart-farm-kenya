import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';

export default function FilterBar({ filter, setFilter, search, setSearch, sort, setSort }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <FaFilter className="filter-icon" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Activities</option>
          <option value="planting">Planting</option>
          <option value="irrigation">Irrigation</option>
          <option value="harvesting">Harvesting</option>
        </select>
      </div>

      <div className="filter-group">
        <FaSearch className="filter-icon" />
        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <FaSort className="filter-icon" />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="status">By Status</option>
        </select>
      </div>
    </div>
  );
}
