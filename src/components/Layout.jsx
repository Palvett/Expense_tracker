import { NavLink, Outlet } from 'react-router-dom'
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
                    <NavLink to="/">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/transactions">
                        <ArrowLeftRight size={18} />
                        <span>Transactions</span>
                    </NavLink>

                    <NavLink to="/budgets">
                        <Wallet size={18} />
                        <span>Budgets</span>
                    </NavLink>

                    <NavLink to="/settings">
                        <Settings size={18} />
                        <span>Settings</span>
                    </NavLink>
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
