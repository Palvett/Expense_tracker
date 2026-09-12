import './ConfirmModal.css'

function ConfirmModal({ title, message, onConfirm, onCancel}) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
        <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="confirm-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className="btn-danger" onClick={onConfirm}>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal
