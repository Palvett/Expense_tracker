import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency } from "../../utils/formatCurrency";
import { TRANSACTION_TYPES } from "../../utils/constants";
import { useCategories } from '../../hooks/useCategories'
import CategoryBadge from '../../components/CategoryBadge'
import './TransactionList.css'

function TransactionItem({ transaction, onEdit, onDelete, readOnly = false }) {
    const { categories } = useCategories()
    const isIncome = transaction.type === TRANSACTION_TYPES.INCOME
    const category = categories.find(
      (c) => String(c.id) === String(transaction.categoryId)
    )

  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <CategoryBadge category={category} />
        <span className="transaction-date">{transaction.date}</span>
      </div>

      <div className="transaction-right">
        <span className="transaction-note">{transaction.note || 'No note'}</span>
        <span className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
        {!readOnly && (
          <>
            <button type="button" className="icon-btn" onClick={() => onEdit(transaction)} aria-label="Edit transaction">
              <Pencil size={16} />
            </button>
            <button type="button" className="icon-btn icon-btn-danger" onClick={() => onDelete(transaction)} aria-label="Delete transaction">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TransactionItem