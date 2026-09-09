import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../utils/constants'
import { getDaysInMonth } from '../../utils/dateHelpers'
import EmptyState from '../../components/EmptyState'
import { LineChartIcon } from 'lucide-react'
import { formatMonthLabel } from '../../utils/dateHelpers'
import './ChartCard.css'

function SpendingOverTimeChart({ transactions, month }) {
    const chartData = useMemo(() => {
        const daysInMonth =  getDaysInMonth(month)
        const dailyTotals = Array.from({ length: daysInMonth }, (_, i) => ({
            day: String(i + 1).padStart(2, '0'),
            amount: 0,
        }))

        transactions
            .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE && t.date.startsWith(month))
            .forEach((t) => {
                const dayOfMonth = t.date.split('-')[2]
                const entry = dailyTotals.find((d) => d.day === dayOfMonth)
                if (entry) {
                    entry.amount += t.amount
                }
            })

        return dailyTotals
    }, [transactions, month])

    const hasData = chartData.some((d) => d.amount > 0)

    if (!hasData) {
        return (
            <div className="chart-card">
                <h3>Spending Over Time</h3>
                <EmptyState
                    icon={LineChartIcon}
                    title="No spending data"
                    message="No expenses recorded for this period yet."
                />
            </div>
        )
    }

    return (
        <div className="chart-card">
            <h3>Spending Over Time for {formatMonthLabel(month)}</h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12}} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SpendingOverTimeChart
