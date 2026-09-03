import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export function useBudgets() {
    const context = useContext(BudgetContext)
    if(!context) {
        throw new Error('useBudgets must be used within a BudgetProvider')
    }
    return context
}