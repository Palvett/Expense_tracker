import { useTransactions } from '../hooks/useTransactions'

function Dashboard() {
    const { transactions, addTransaction } = useTransactions()

    function handleTestAdd() {
        addTransaction ({
            type: 'expense',
            amount: 25,
            categoryId: 'cat-food',
            date: '2026-08-01',
            note: 'Test transaction',
        })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleTestAdd}>Add test</button>
            <p>Total transactions: {transactions.length}</p>
            <pre>{JSON.stringify(transactions, null, 2)}</pre>
        </div>
    )
}

export default Dashboard