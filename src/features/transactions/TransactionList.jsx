import TransactionItem from "./TransactionItem"
import './TransactionList.css'

function TransactionList({ transactions, onEdit }) {
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
            />
        ))}
    </div>
  )
}

export default TransactionList
