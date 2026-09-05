import SummaryCards from '../features/dashboard/SummaryCards'
import RecentTransactions from '../features/dashboard/RecentTransactions'
import CategorySpendingChart from '../features/dashboard/CategorySpendingChart'
import { useTransactions } from '../hooks/useTransactions'
import { getCurrentMonth } from '../utils/dateHelpers'

function Dashboard() {
    const { transactions } = useTransactions()
    const month = getCurrentMonth()

    return (
        <div>
            <h1 className="page-title">Dashboard</h1>
            <SummaryCards transactions={transactions} month={month} />

            <div className="dashboard-charts">
                <CategorySpendingChart transactions={transactions} month={month} />
            </div>

            <RecentTransactions transactions={transactions} />
        </div>
    )
}

export default Dashboard