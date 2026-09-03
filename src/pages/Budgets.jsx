import BudgetForm from "../features/budgets/BudgetForm"

function Budgets() {
  return (
    <div>
      <h1 className="page-title">Budgets</h1>
      <div style={{width: '70%', margin: '0 auto'}}>
        <BudgetForm />
      </div>
    </div>
  )
}

export default Budgets
