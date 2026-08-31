import { useState } from 'react'
import TransactionForm from "../features/transactions/TransactionForm"

function Transactions() {
  const [editingTransaction, setEditingTransaction] = useState(null)

  const fakeTransaction = {
    id: 'test-123',
    type: 'expense',
    amount: 50,
    categoryId: 'cat-food',
    date: '2026-08-15',
    note: 'Groceries',
  }

  return (
    <div>
      <h1 className="page-title">Transactions</h1>
      <button onClick={() => setEditingTransaction(fakeTransaction)}>
        Test Edit Mode
      </button>
      <button onClick={() => setEditingTransaction(null)}>
        Test Add Mode
      </button>
      <TransactionForm
        key={editingTransaction?.id ?? 'new'}
        initialData={editingTransaction} />
    </div>
  )
}

export default Transactions
