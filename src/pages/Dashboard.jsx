import { useState } from 'react'
import SummaryCards from '../features/dashboard/SummaryCards'
import RecentTransactions from '../features/dashboard/RecentTransactions'
import { useTransactions } from '../hooks/useTransactions'

function getCurrentMonth() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

function Dashboard() {
    const { transactions } = useTransactions()
    const [ selectedMonth] = useState(getCurrentMonth())

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>
            <SummaryCards transactions={transactions} month={selectedMonth} />
            <RecentTransactions transactions={transactions} />
        </div>
    )
}

export default Dashboard