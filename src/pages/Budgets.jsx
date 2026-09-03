import { useState } from "react"
import BudgetForm from "../features/budgets/BudgetForm"
import BudgetProgress from "../features/budgets/BudgetProgress"
import { useBudgets } from "../hooks/useBudgets"

function getCurrentMonth() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function Budgets() {
  const { budgets } = useBudgets()
  const [selectedMonth] = useState(getCurrentMonth())

  return (
    <div>
      <h1 className="page-title">Budgets</h1>
      <div style={{width: '70%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <BudgetForm />
        <BudgetProgress budgets={budgets} month={selectedMonth} />
      </div>
    </div>
  )
}

export default Budgets
