// src/utils/constants.js

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

export const DEFAULT_CATEGORIES = [
  { id: 'cat-food', name: 'Food', color: '#f97316', isDefault: true },
  { id: 'cat-transport', name: 'Transport', color: '#3b82f6', isDefault: true },
  { id: 'cat-rent', name: 'Rent', color: '#8b5cf6', isDefault: true },
  { id: 'cat-entertainment', name: 'Entertainment', color: '#ec4899', isDefault: true },
  { id: 'cat-salary', name: 'Salary', color: '#22c55e', isDefault: true },
  { id: 'cat-other', name: 'Other', color: '#64748b', isDefault: true },
]

// Transaction shape:
// {
//   id: string,          // unique identifier, e.g. crypto.randomUUID()
//   type: 'income' | 'expense',
//   amount: number,       // always positive; type field tells you direction
//   categoryId: string,   // references a Category's id
//   date: string,         // ISO format: '2026-08-29'
//   note: string          // optional, can be empty string
// }

// Category shape:
// {
//   id: string,
//   name: string,
//   color: string,     // hex code, e.g. '#22c55e'
//   isDefault: boolean  // true for seeded categories, false for user-created
// }

// Budget shape:
// {
//   id: string,
//   categoryId: string,  // references a Category's id
//   month: string,        // 'YYYY-MM', e.g. '2026-08'
//   limit: number          // positive number, the spending cap
// }