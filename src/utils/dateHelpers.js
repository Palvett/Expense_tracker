export function getCurrentMonth() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}

export function getDaysInMonth(monthString) {
    const [year, month] = monthString.split('-').map(Number)
    return new Date(year, month, 0).getDate()
}