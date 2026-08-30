import { TransactionContext } from './TransactionContext'
import useLocalStorage from '../hooks/useLocalStorage'

// Transaction shape:
// {
//   id: string,
//   type: 'income' | 'expense',
//   amount: number,
//   categoryId: string,
//   date: string,        // ISO format: '2026-08-29'
//   note: string
// }

export function TransactionProvider({ children}) {
    const [transactions, setTransactions] = useLocalStorage('transactions', [])

    function addTransaction(transaction) {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
        }
        setTransactions((prev) => [...prev, newTransaction])
    }

    function updateTransaction(id, updates) {
        setTransactions((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
        )
    }

    function deleteTransaction(id) {
        setTransactions((prev) => prev.filter((t) => t.id !== id))
    }

    const value = {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}
