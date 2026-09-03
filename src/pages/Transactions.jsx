import { useState } from 'react'
import { Plus } from 'lucide-react'
import TransactionForm from "../features/transactions/TransactionForm"
import TransactionList from '../features/transactions/TransactionList'
import FiltersBar from '../features/transactions/FiltersBar'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import { useTransactions } from '../hooks/useTransactions'
import useDebounce from '../hooks/useDebounce'

function Transactions() {
  const { transactions, deleteTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [deletingTransaction, setDeletingTransaction] = useState(null)

  const [filters, setFilters] = useState({
    month: '',
    type:'all',
    categoryId: 'all',
    searchInput: '',
  })

  const debouncedSearch = useDebounce(filters.searchInput, 350)

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredTransactions = transactions.filter((t) => {
    const matchesMonth = !filters.month || t.date.startsWith(filters.month)
    const matchesType = filters.type === 'all' || t.type === filters.type
    const matchesCategory = filters.categoryId === 'all' || t.categoryId === filters.categoryId
    const matchesSearch =
      !debouncedSearch ||
      (t.note ?? '').toLowerCase().includes(debouncedSearch.toLowerCase())
    
    return matchesMonth && matchesType && matchesCategory && matchesSearch 
  })

  const hasActiveFilters =
    filters.month || filters.type !== 'all' || filters.categoryId !== 'all' || debouncedSearch

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

  function handleDeleteClick(transaction) {
    setDeletingTransaction(transaction)
  }

  function handleConfirmDelete() {
    deleteTransaction(deletingTransaction.id)
    setDeletingTransaction(null)
  }

  function handleCancelDelete() {
    setDeletingTransaction(null)
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

      <FiltersBar filters={filters} onFilterChange={handleFilterChange} />

      <TransactionList
        transactions={filteredTransactions}
        hasActiveFilters={hasActiveFilters}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onAddClick={handleAddClick}
      />

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

      {deletingTransaction && (
        <ConfirmModal
          title="delete transaction?"
          message={`This will permanently delete this ${deletingTransaction.type} of ${deletingTransaction.amount}. This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}

export default Transactions