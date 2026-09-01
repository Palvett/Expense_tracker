import { Receipt } from "lucide-react"
import TransactionItem from "./TransactionItem"
import './TransactionList.css'
import EmptyState from "../../components/EmptyState"

function TransactionList({ transactions, onEdit, onDelete, onAddClick }) {
    if (transactions.length === 0) {
        return (
            <EmptyState
                icon={Receipt}
                title="No transactions yet"
                message="Start tracking your income and expenses by adding your first transction."
                actionLabel="Add Transaction"
                onAction={onAddClick}
            />
        )
    }
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )
  return (
    <div className="transaction-list">
        {sortedTransactions.map((transaction) => (
            <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ))}
    </div>
  )
}

export default TransactionList
