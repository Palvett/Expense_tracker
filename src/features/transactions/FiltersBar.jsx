import { Search } from 'lucide-react'
import { useCategories } from '../../hooks/useCategories'
import { TRANSACTION_TYPES } from '../../utils/constants'
import './FiltersBar.css'

function FiltersBar({ filters, onFilterChange }) {
    const { categories } = useCategories()

    return (
    <div className="filters-bar">
      <input
        type="month"
        value={filters.month}
        onChange={(e) => onFilterChange('month', e.target.value)}
      />

      <select
        value={filters.type}
        onChange={(e) => onFilterChange('type', e.target.value)}
      >
        <option value="all">All</option>
        <option value={TRANSACTION_TYPES.INCOME}>Income</option>
        <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
      </select>

      <select
        value={filters.categoryId}
        onChange={(e) => onFilterChange('categoryId', e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="search-input">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search notes..."
          value={filters.searchInput}
          onChange={(e) => onFilterChange('searchInput', e.target.value)}
        />
      </div>
    </div>
  )
}

export default FiltersBar