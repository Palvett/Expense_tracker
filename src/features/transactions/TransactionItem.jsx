import { formatCurrency } from "../../utils/formatCurrency";
import { TRANSACTION_TYPES } from "../../utils/constants";

function TransactionItem({ transaction }) {
    const isIncome = transaction.type === TRANSACTION_TYPES.INCOME

  return (
    <div className="transaction-item">
        <div className="transaction-info">
            <span className="transaction-date">{transaction.date}</span>
            <span clsasName="transaction-note">{transaction.note || 'No note'}</span>
        </div>
        <span className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
            {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
    </div>
  )
}

export default TransactionItem
