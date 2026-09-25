import { useEffect } from "react"
import { ThemeContext } from "./ThemeContext"
import useLocalStorage from '../hooks/useLocalStorage'

function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorage('theme', getSystemPreference())

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const value = { theme, toggleTheme}

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}