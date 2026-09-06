import { useState } from "react"
import { useCategories } from "../../hooks/useCategories"
import { useBudgets } from "../../hooks/useBudgets"
import { getCurrentMonth } from "../../utils/dateHelpers"
import './BudgetForm.css'

function BudgetForm({ initialData, onSuccess }) {
    const { categories } = useCategories()
    const { budgets, addBudget, updateBudget } = useBudgets()

    const isEditMode = Boolean(initialData)

    const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '')
    const [month, setMonth] = useState(initialData?.month ?? getCurrentMonth())
    const [limit, setLimit] = useState(initialData?.limit?.toString() ?? '')
    const [errors, setErrors] = useState({})
    
    function Validate() {
        const newErrors = {}

        if (!categoryId) {
            newErrors.category = 'Category is required'
        }

        if (!month) {
            newErrors.month = 'Month is required'
        }

        const parsedLimit = parseFloat(limit)
        if (!limit || isNaN(parsedLimit) || parsedLimit <= 0) {
            newErrors.limit = 'Limit must be a positive number'
        }

        if (!isEditMode) {
            const existingBudget = budgets.find(
                (b) => b.categoryId === categoryId && b.month === month
            )
            if (existingBudget) {
                newErrors.category = 'A budget already exists for this category and month'
            }
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!Validate()) return

        const budgetData = {
            categoryId,
            month,
            limit: parseFloat(limit),
        }

        if (isEditMode) {
            updateBudget(initialData.id, budgetData)
        } else {
          addBudget(budgetData)
        }

        if (onSuccess) {
            onSuccess()
        }

        if (!isEditMode) {
            setCategoryId('')
            setLimit('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="budget-form">
            <div className="form-group">
                <label htmlFor="budget-category">Category</label>
                <select
                    id="budget-category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={isEditMode}
                >
                    <option value="">Select a Category</option>
                    {categories.map((cat) =>(
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {errors.category && <span className="error">{errors.category}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="budget-month">Month</label>
                <input
                    id="budget-month"
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    disabled={isEditMode}
                />
                {errors.month && <span className="error">{errors.month}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="budget-limit">Monthly Limit</label>
                <input
                    id="budget-limit"
                    type="number"
                    step="0.01"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                />
                {errors.limit && <span className="error">{errors.limit}</span>}
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {isEditMode ? 'Update Budget' : 'Set Budget'}
                </button>
            </div>
        </form>
    )
}

export default BudgetForm