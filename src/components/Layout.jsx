import { Link, Outlet } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Wallet, Settings, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import './Layout.css'

function Layout() {
    const { theme, toggleTheme } = useTheme()
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

            <button className="theme-toggle" type="button" onClick={toggleTheme}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
            </button>
        </aside>
        <main className="content">
            <div className="page-container">
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default Layout
