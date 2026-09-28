import { BudgetContext } from "./BudgetContext";
import useLocalStorage from "../hooks/useLocalStorage";

// Budget shape:
// {
//   id: string,
//   categoryId: string,  // references a Category's id
//   month: string,        // 'YYYY-MM', e.g. '2026-08'
//   limit: number          // positive number, the spending cap
// }

export function BudgetProvider({ children }) {
    const [budgets, setBudgets] = useLocalStorage('budgets',[])

    function addBudget(budget) {
        const newBudget = {
            ...budget,
            id: crypto.randomUUID(),
        }
        setBudgets((prev) => [...prev, newBudget]) 
    }
        
    function updateBudget(id, updates) {
        setBudgets((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
        )
    }

    function deleteBudget(id) {
        setBudgets((prev) => prev.filter((b) => b.id !== id))
    }

    const value = {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget
    }
    
    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}

export default BudgetProvider
