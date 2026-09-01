import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from "../../utils/formatCurrency";
import { TRANSACTION_TYPES } from "../../utils/constants";
import { useCategories } from '../../hooks/useCategories'
import './TransactionList.css'

function TransactionItem({ transaction, onEdit, onDelete }) {
    const { categories } = useCategories()
    const isIncome = transaction.type === TRANSACTION_TYPES.INCOME
    const category = categories.find((c) => c.id === transaction.categoryId)

  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <span
          className="category-dot"
          style={{ backgroundColor: category?.color ?? '#ccc' }}
        />
        <div className="transaction-info">
          <span className="transaction-category">{category?.name ?? 'Uncategorized'}</span>
          <span className="transaction-date">{transaction.date}</span>
        </div>
      </div>

      <div className="transaction-right">
        <span className="transaction-note">{transaction.note || 'No note'}</span>
        <span className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
        <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(transaction)}
            aria-label="Edit transaction"
        >
            <Pencil size={16} />
        </button>
        <button
            type="button"
            className="icon-btn icon-btn-danger"
            onClick={() => onDelete(transaction)}
            aria-label="Delete transaction"
        >
            <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default TransactionItem