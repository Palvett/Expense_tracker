import { useState } from 'react'
import Modal from '../../components/Modal'
import CategoryBadge from '../../components/CategoryBadge'

function ReassignModal({ category, usageCount, otherCategories, onConfirm, onCancel }) {
    const [selectedId, setSelectedId] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (!selectedId) return
        onConfirm(selectedId)
    }
    return (
    <Modal title="Reassign transactions" onClose={onCancel}>
        <p>
            <CategoryBadge category={category} /> is used by {usageCount} transaction{usageCount !== 1 ? 's' : ''}.
            Choose a category to move {usageCount !== 1 ? 'them' : 'it'} to before deleting.
        </p>

        <form onSubmit={handleSubmit} className="reassign-form">
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                <option value="">Select a category</option>
                {otherCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}   
                    </option>
                ))}
            </select>

            <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={!selectedId}>
                    Reassign and Delete
                </button>
            </div>
        </form>
    </Modal>
  )
}

export default ReassignModal
