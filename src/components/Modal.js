import { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  const [isDisplaying, setIsDisplaying] = useState(isOpen)

  useEffect(() => {
    let timeoutId
    if (isOpen) {
      setIsDisplaying(true)
    } else {
      timeoutId = setTimeout(() => {
        setIsDisplaying(false)
      }, 500)
    }

    return () => clearTimeout(timeoutId)
  }, [isOpen])

  useEffect(() => {
    if (isOpen || isDisplaying) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isDisplaying])

  if (!isDisplaying) return null

  const modalClass = isOpen ? 'modal--is-open' : 'modal--is-closed'
  const backdropClass = isOpen ? 'modal-backdrop--is-open' : 'modal-backdrop--is-closed'
  return (
    <>
      <div
        className={`modal-backdrop ${backdropClass}`}
        onClick={onClose}
      ></div>
      <div className={`modal ${modalClass}`}>
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
