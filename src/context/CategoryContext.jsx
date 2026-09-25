import { CategoryContext } from "./CategoryContext"
import useLocalStorage from "../hooks/useLocalStorage"
import { DEFAULT_CATEGORIES } from "../utils/constants"

// Category shape:
// {
//   id: string,
//   name: string,
//   color: string,     // hex code, e.g. '#22c55e'
//   isDefault: boolean
// }

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useLocalStorage('categories', DEFAULT_CATEGORIES)

    function addCategory(category) {
        const newCategory = {
            ...category,
            id: crypto.randomUUID(),
            isDefault: false,
        }
        setCategories((prev) =>[...prev, newCategory])
    }

    function deleteCategory(id) {
        setCategories((prev) => prev.filter((c) => c.id !== id))
    }

    const value = {
        categories,
        addCategory,
        deleteCategory,
    }

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}