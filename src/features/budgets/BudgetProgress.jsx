import { AlertTriangle } from 'lucide-react'
import { useTransactions} from '../../hooks/useTransactions'
import { useCategories } from '../../hooks/useCategories'
import { formatCurrency} from '../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../utils/constants'
import CategoryBadge from '../../components/CategoryBadge'
import EmptyState from '../../components/EmptyState'
import './BudgetProgress.css'

function BudgetProgress({ budgets, month}) {
    const { transactions } = useTransactions()
    const { categories } = useCategories()

    const monthBudgets = budgets.filter((b) => b.month === month)

    if (monthBudgets.length === 0) {
        return (
            <EmptyState
                title="No budgets set for this month"
                message="Set a budget for a category above to start traking your spending against it."
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
                            <span className="budget-progress-amounts">
                                {formatCurrency(spent)} / {formatCurrency(budget.limit)}
                            </span>
                        </div>

                        <div className="progress-bar-track">
                            <div
                                className={`progress-bar-fill ${barColorClass}`}
                                style={{ width: `${percentage}%`}}
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
        </div>
    )
}

export default BudgetProgress
