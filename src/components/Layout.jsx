import { Link, Outlet } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Wallet, Settings, Sun } from 'lucide-react'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
        <aside className="sidebar">
            <h2 className="sidebar-title">Expense Tracker</h2>
        
            <nav className="sidebar-nav">
                <Link to="/">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/transactions">
                    <ArrowLeftRight size={18} />
                    <span>Transactions</span>
                </Link>
                <Link to="/budgets">
                    <Wallet size={18} />
                    <span>Budgets</span>
                </Link>
                <Link to="/settings">
                    <Settings size={18} />
                    <span>Settings</span>
                </Link>
            </nav>

            <button className="theme-toggle" type="button">
                <Sun size={18} />
                <span>Toggle theme</span>
            </button>
        </aside>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout
