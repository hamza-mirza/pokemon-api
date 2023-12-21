import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="modal">
        <div className="modal-content">
          <button
            className="modal-close"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
