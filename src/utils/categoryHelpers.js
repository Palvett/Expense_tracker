export function getCategoriesForType(categories, type, keepId = '') {
  return categories.filter((cat) => {
    if (cat.id === keepId) return true
    const catType = cat.type ?? 'both'
    return catType === 'both' || catType === type
  })
}