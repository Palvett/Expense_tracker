import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useCategories } from '../../hooks/useCategories'
import { formatCurrency } from '../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../utils/constants'
import EmptyState from '../../components/EmptyState'
import { BarChart3 } from 'lucide-react'

function CategorySpendingChart({ transactions, month }) {
    const { categories } = useCategories()

    const chartData = useMemo(() => {
        const monthExpenses =transactions.filter(
            (t) => t.type === TRANSACTION_TYPES.EXPENSE && t.date.startsWith(month)
        )

        const totalsByCategory = {}
        monthExpenses.forEach((t) => {
            totalsByCategory[t.categoryId] = (totalsByCategory[t.categoryId] || 0) + t.amount
        })

        return Object.entries(totalsByCategory)
            .map(([categoryId, total]) => {
                const category = categories.find((c) => c.id === categoryId)
                return {
                    name: category?.name ?? 'Uncategorized',
                    amount: total,
                    color: category?.color ?? '#cccccc',
                }
            })
            .sort((a, b) => b.amount - a.amount)
    }, [transactions, categories, month])

    if (chartData.length === 0) {
        return (
            <div className="chart-card">
                <h3>Spending by Category</h3>
                <EmptyState
                    icon={BarChart3}
                    title="No spending data"
                    message="No expenses recorded for this period yet"
                />
            </div>
        )
    }

    return (
        <div className="chart-card">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" horizontal={false} />
                    <XAxis type="number" fontSize={12} />
                    <YAxis type="category" dataKey="name" fontSize={12} width={90} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CategorySpendingChart