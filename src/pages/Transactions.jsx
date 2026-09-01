import { useState } from 'react'
import { Plus } from 'lucide-react'
import TransactionForm from "../features/transactions/TransactionForm"
import Modal from '../components/Modal'

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  function handleAddClick() {
    setEditingTransaction(null)
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