import { useState } from 'react'
import { AlertTriangle, Pencil, Trash2 } from 'lucide-react'
import { useTransactions} from '../../hooks/useTransactions'
import { useCategories } from '../../hooks/useCategories'
import { formatCurrency} from '../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../utils/constants'
import CategoryBadge from '../../components/CategoryBadge'
import EmptyState from '../../components/EmptyState'
import Modal from '../../components/Modal'
import BudgetForm from './BudgetForm'
import './BudgetProgress.css'
import { useBudgets } from '../../hooks/useBudgets'
import ConfirmModal from '../../components/ConfirmModal'

function BudgetProgress({ budgets, month}) {
    const { transactions } = useTransactions()
    const { categories } = useCategories()
    const { deleteBudget } = useBudgets()
    const [editingBudget, setEditingBudget] = useState(null)
    const [deletingBudget, setDeletingBudget] = useState(null)

    const monthBudgets = budgets.filter((b) => b.month === month)

    if (monthBudgets.length === 0) {
        return (
            <EmptyState
                title="No budgets set for this month"
                message="Set a budget for a category above to start tracking your spending against it."
            />
        )
    }

    function getSpent(categoryId) {
        return transactions
            .filter(
                (t) =>
                    t.categoryId === categoryId &&
                    t.type === TRANSACTION_TYPES.EXPENSE &&
                    t.date.startsWith(month)
            )
            .reduce((sum, t) => sum + t.amount, 0)
    }

    function handleConfirmDelete() {
        deleteBudget(deletingBudget.id)
        setDeletingBudget(null)
    }
    return (
        <div className="budget-progress-list">
            {monthBudgets.map((budget) => {
                const category = categories.find((c) => c.id === budget.categoryId)
                const spent = getSpent(budget.categoryId)
                const percentage = Math.min((spent / budget.limit) * 100, 100)
                const isOverBudget = spent > budget.limit

                let barColorClass = 'bar-normal'
                if (isOverBudget) {
                    barColorClass = 'bar-over'
                } else if (percentage >= 80) {
                    barColorClass = 'bar-warning'
                }
                
                return (
                    <div key={budget.id} className="budget-progress-item">
                        <div className="budget-progress-header">
                            <CategoryBadge category={category} />
                            <div className="budget-progress-header-right">
                                <span className="budget-progress-amounts">
                                    {formatCurrency(spent)} / {formatCurrency(budget.limit)}
                                </span>
                                <button
                                    type="button"
                                    className="icon-btn"
                                    onClick={() => setEditingBudget(budget)}
                                    aria-label={`Edit budget for ${category?.name ?? 'category'}`}
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    type="button"
                                    className="icon-btn icon-btn-danger"
                                    onClick={() => setDeletingBudget(budget)}
                                    aria-label={`Delete budget for ${category?.name ?? 'category'}`}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="progress-bar-track">
                            <div
                                className={`progress-bar-fill ${barColorClass}`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                        {isOverBudget && (
                            <div className="over-budget-warning">
                                <AlertTriangle size={14} />
                                Over budget by {formatCurrency(spent - budget.limit)}
                            </div>
                        )}
                    </div>
                )
            })}

            {editingBudget && (
                <Modal title="Edit Budget" onClose={() => setEditingBudget(null)}>
                    <BudgetForm
                        key={editingBudget.id}
                        initialData={editingBudget}
                        onSuccess={() => setEditingBudget(null)}
                    />
                </Modal>
            )}

            {deletingBudget && (
                <ConfirmModal
                    title="Delete budget?"
                    message={`This will permanently remove the budget for "${categories.find((c) => c.id === deletingBudget.categoryId)?.name ?? 'this category'}" (${month}). This cannot be undone.`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeletingBudget(null)}
                />
            )}
        </div>
    )
}

export default BudgetProgress
