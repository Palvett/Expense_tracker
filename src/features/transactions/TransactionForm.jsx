import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useTransactions } from "../../hooks/useTransactions";
import { TRANSACTION_TYPES } from "../../utils/constants";
import { formatCurrency } from "../../utils/formatCurrency";
import './TransactionForm.css'

function TransactionForm({ initialData, onSuccess }) {
    const { categories } = useCategories()
    const { addTransaction, updateTransaction } = useTransactions()

    const isEditMode = Boolean(initialData)

    const [ type, setType ] = useState(initialData?.type ?? TRANSACTION_TYPES.EXPENSE)
    const [ amount, setAmount ] = useState(initialData?.amount?.toString() ?? '')
    const [ categoryId, setCategoryId ] = useState(initialData?.categoryId ?? '')
    const [ date, setDate] = useState(initialData?.date ?? '')
    const [ note,setNote ] = useState(initialData?.note ?? '')
    const [ errors, setErrors ] = useState({})
    const [ isAmountFocused, setIsAmountFocused] = useState(false)

    function validate() {
        const newErrors = {}

        const parseAmount = parseFloat(amount)
        if (!amount || isNaN(parseAmount) || parseAmount <= 0) {
            newErrors.amount = 'Amount must be a positive number'
        }

        if (!categoryId) {
            newErrors.category = 'Category is required'
        }

        if (!date) {
            newErrors.date = 'Date is required'
        } else {
            const today = new Date()
            today.setHours(23, 59, 59, 999)
            const oneYearFromNow = new Date()
            oneYearFromNow.setFullYear(today.getFullYear() + 1)

            const selectDate = new Date(date)
            if (selectDate > oneYearFromNow) {
                newErrors.date = 'Date is too far in the future'
            }
        }

        if (note.length > 200) {
            newErrors.note = 'Note must be 200 characters or fewer'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!validate()) return

        const transactionData = {
            type,
            amount: parseFloat(amount),
            categoryId,
            date,
            note,
        }

        if (isEditMode) {
            updateTransaction(initialData.id, transactionData)
        } else {
            addTransaction(transactionData)
        }

        if (onSuccess) {
            onSuccess()
        }

        if (!isEditMode) {
            setType(TRANSACTION_TYPES.EXPENSE)
            setAmount('')
            setCategoryId('')
            setDate('')
            setNote('')
        }  
    }

    const displayAmount = !isAmountFocused && amount && !isNaN(parseFloat(amount))
        ? formatCurrency(parseFloat(amount))
        : amount

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
                <label>Type</label>
                <div className="type-toggle">
                    <button
                        type="button"
                        className={type === TRANSACTION_TYPES.EXPENSE ? 'active' : ''}
                        onClick={() => setType(TRANSACTION_TYPES.EXPENSE)}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        className={type === TRANSACTION_TYPES.INCOME ? 'active' : ''}
                        onClick={() => setType(TRANSACTION_TYPES.INCOME)}
                    >
                        Income
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type={isAmountFocused ? 'number' : 'text'}
                    step="0.01"
                    value={displayAmount}
                    onFocus={() => setIsAmountFocused(true)}
                    onBlur={() => setIsAmountFocused(false)}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <span className="error">{errors.amount}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {errors.category && <span className="error">{errors.category}</span>}
            </div>

            <div className= "form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="note">Note</label>
                <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={200}
                />
                <span className="char-count">{note.length}/200</span>
                {errors.note && <span className="error">{errors.note}</span>}
            </div>
            <div className="form-actions">
                <button type="submit">
                    {isEditMode ? 'Update Transaction' : 'Save Transaction'}
                </button>
            </div>
        </form>
    )
}

export default TransactionForm