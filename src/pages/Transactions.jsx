import { useState } from 'react'
import { Plus } from 'lucide-react'
import TransactionForm from "../features/transactions/TransactionForm"
import TransactionList from '../features/transactions/TransactionList'
import Modal from '../components/Modal'
import { useTransactions } from '../hooks/useTransactions'

function Transactions() {
  const { transactions } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  function handleAddClick() {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  function handleEditClick(transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <button type="button" className="btn-primary" onClick={handleAddClick}>
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      <TransactionList transactions={transactions} onEdit={handleEditClick} />

      {isModalOpen && (
        <Modal
          title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          onClose={handleCloseModal}
        >
          <TransactionForm
            key={editingTransaction?.id ?? 'new'}
            initialData={editingTransaction}
            onSuccess={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default Transactions