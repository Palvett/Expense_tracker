import './EmptyState.css'

function EmptyState({ icon: Icon, title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={40} strokeWidth={1.5} />}
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <buton type="button" classname="btn-primary" onClick={onAction}>
            {actionLabel}
        </buton>
      )}
    </div>
  )
}

export default EmptyState
