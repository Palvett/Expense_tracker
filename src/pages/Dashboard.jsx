import { useState } from 'react'
import SummaryCards from '../features/dashboard/SummaryCards'
import RecentTransactions from '../features/dashboard/RecentTransactions'
import { useTransactions } from '../hooks/useTransactions'
import { getCurrentMonth } from '../utils/dateHelpers'

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