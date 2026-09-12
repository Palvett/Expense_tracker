import './CategoryBadge.css'

function CategoryBadge({ category }) {
  return (
    <span className="category-badge">
        <span
            classname="category-dot"
            style={{ backgroundColor: category?.color ?? `#ccc`}}
        />
        {category?.name ?? 'Uncategorised'}
    </span>
  )
}

export default CategoryBadge
