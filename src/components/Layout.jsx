import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div>
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/budgets">Budgets</Link>
            <Link to="/settings">Settings</Link>
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout
