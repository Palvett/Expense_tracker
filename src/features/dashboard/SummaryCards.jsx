import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { TRANSACTION_TYPES } from '../../utils/constants'
import './SummaryCards.css'

function SummaryCards({ transactions, month }) {
    const monthTransactions = transactions.filter((t) => t.date.startsWith(month))

    const totalIncome = monthTransactions
        .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
        .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = monthTransactions
        .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0)

    const netBalance = totalIncome - totalExpenses


    return (
        <div className=" summary-cards">
            <div className='summary-card'>
                <div className="summary-card-header">
                    <span>Total Income</span>
                    <TrendingUp size={18} className="icon-income" />
                </div>
                <span className="summary-card-value income">{formatCurrency(totalIncome)}</span>
            </div>

            <div className="summary-card">
                <div className="summary-card-header">
                    <span>Total Expenses</span>
                    <TrendingDown size={18} className="icon-expense" />
                </div>
                <span className="summary-card-value expense">{formatCurrency(totalExpenses)}</span>
            </div>

            <div className="summary-card">
                <div className="summary-card-header">
                    <span>Net Balance</span>
                    <Wallet size={18} className="icon-balance" />
                </div>
                <span className={`summary-card-value ${netBalance >= 0 ? 'income' : 'expense'}`}>
                    {formatCurrency(netBalance)}
                </span>
            </div>

        </div>
  )
}

export default SummaryCards
