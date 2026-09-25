import { Search } from 'lucide-react'
import { useCategories } from '../../hooks/useCategories'
import { TRANSACTION_TYPES } from '../../utils/constants'
import './FiltersBar.css'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getYearOptions() {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let y = currentYear - 3; y <= currentYear + 1; y++) {
    years.push(y)
  }
  return years
}

function FiltersBar({ filters, onFilterChange }) {
  const { categories } = useCategories()

  const [selectedYear, selectedMonthNum] = filters.month
    ? filters.month.split('-')
    : ['', '']

  function handleMonthChange(newMonthNum) {
    const year = selectedYear || new Date().getFullYear().toString()
    onFilterChange('month', newMonthNum ? `${year}-${newMonthNum}` : '')
  }

  function handleYearChange(newYear) {
    const monthNum = selectedMonthNum || String(new Date().getMonth() + 1).padStart(2, '0')
    onFilterChange('month', newYear ? `${newYear}-${monthNum}` : '')
  }

  return (
    <div className="filters-bar">
      <select
        className="filter-type"
        value={filters.type}
        onChange={(e) => onFilterChange('type', e.target.value)}
      >
        <option value="all">All Types</option>
        <option value={TRANSACTION_TYPES.INCOME}>Income</option>
        <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
      </select>

      <select
        className="filter-category"
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

      <select
        className="filter-month"
        value={selectedMonthNum}
        onChange={(e) => handleMonthChange(e.target.value)}
      >
        <option value="">Month</option>
        {MONTH_NAMES.map((name, index) => (
          <option key={name} value={String(index + 1).padStart(2, '0')}>
            {name}
          </option>
        ))}
      </select>

      <select
        className="filter-year"
        value={selectedYear}
        onChange={(e) => handleYearChange(e.target.value)}
      >
        <option value="">Year</option>
        {getYearOptions().map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  )
}

export default FiltersBar