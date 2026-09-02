import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { useCategories } from "../../hooks/useCategories"
import { useTransactions } from "../../hooks/useTransactions"
import { CATEGORY_COLOR_PALETTE } from '../../utils/colors'
import CategoryBadge from "../../components/CategoryBadge"
import ConfirmModal from "../../components/ConfirmModal"
import ReassignModal from './ReassignModal'
import './CategoryManager.css'


function CategoryManager() {
    const { categories, addCategory, deleteCategory } = useCategories()
    const { transactions, reassignCategory } = useTransactions()

    const [name, setName] = useState('')
    const [color, setColor] = useState(CATEGORY_COLOR_PALETTE[0])
    const [error, setError] = useState('')

    const [deletingCategory, setDeletingCategory] = useState(null)
    const [reassigningCategory, setReassigningCategory] = useState(null)

    function handleAddSubmit(e) {
        e.preventDefault()

        if (!name.trim()) {
            setError('Category name is required')
            return
        }

        addCategory({ name: name.trim(), color })
        setName('')
        setColor(CATEGORY_COLOR_PALETTE[0])
        setError('')
    }

    function getUsageCount(categoryId) {
        return transactions.filter(
            (t) => String(t.categoryId) === String(categoryId)
        ).length
    }

    function handleDeleteClick(category) {
        const usageCount = getUsageCount(category.id)
        if (usageCount > 0) {
            setReassigningCategory(category)
        } else {
          setDeletingCategory(category)
        }
    }

    function handleConfirmDelete() {
        deleteCategory(deletingCategory.id)
        setDeletingCategory(null)
    }

    function handleConfirmReassign(newCategoryId) {
        reassignCategory(reassigningCategory.id, newCategoryId)
        deleteCategory(reassigningCategory.id)
        setReassigningCategory(null)
    }

    return (
        <div className="category-manager">
            <form className="category-add-form" onSubmit={handleAddSubmit}>
                <input
                    type="text"
                    placeholder="New category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="color-picker">
                    {CATEGORY_COLOR_PALETTE.map((swatch) => (
                        <button
                            key={swatch}
                            type="button"
                            className={`color-swatch ${color === swatch ? 'selected' : ''}`}
                            style={{ backgroundColor: swatch }}
                            onClick={() => setColor(swatch)}
                            aria-label={`Select color ${swatch}`}
                        />
                    ))}
                </div>

                <button type="submit" className="btn-primary">
                    <Plus size={16} />
                    Add
                </button>
            </form>
            {error && <span className="error">{error}</span>}

            <div className="category-list">
                {categories.map((category) => (
                    <div key={category.id} className="category-row">
                        <CategoryBadge category={category} />
                        <span className="category-usage">
                            {getUsageCount(category.id)} transaction{getUsageCount(category.id) !== 1 ? 's' : ''}
                        </span>
                        <button
                            type="button"
                            className="icon-btn icon-btn-danger"
                            onClick={() => handleDeleteClick(category)}
                            aria-label={`Delete ${category.name}`}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {deletingCategory && (
                <ConfirmModal
                    title="Delete category?"
                    message={`"${deletingCategory.name}" is not used by any transactions.This cannot be undone.`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeletingCategory(null)}
                />
            )}

            {reassigningCategory && (
                <ReassignModal
                    category={reassigningCategory}
                    usageCount={getUsageCount(reassigningCategory.id)}
                    otherCategories={categories.filter(
                        (c) => String(c.id) !== String(reassigningCategory.id)
                    )}
                    onConfirm={handleConfirmReassign}
                    onCancel={() => setReassigningCategory(null)}
                />
            )}
        </div>
    )
}

export default CategoryManager
