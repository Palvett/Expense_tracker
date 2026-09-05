import { Link } from 'react-router-dom'
import TransactionItem from '../transactions/TransactionItem'
import EmptyState from '../../components/EmptyState'
import { Receipt } from 'lucide-react'
import './RecentTransactions.css'

function RecentTransactions({ transactions }) {
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    return (
        <div className="recent-transactions">
            <div className="recent-transactions-header">
                <h3>Recent Transactions</h3>
                <Link to="/transactions" className="view-all-link">
                    View all
                </Link>
            </div>

            {recentTransactions.length === 0 ? (
                <EmptyState
                    icon={Receipt}
                    title="No transactions yet"
                    message="Your recent transactions will show up here."
                />
            ) : (
                <div className="recent-transactions-list">
                    {recentTransactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} readOnly />
                    ))}
                </div>
            )}
        </div>
  )
}

export default RecentTransactions
