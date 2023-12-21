/**
 * @file Modal.js
 * Implements a reusable modal component for the application.
 * Manages its own open/close state and animations.
 * Can be used to display any content passed as children in an overlay fashion.
 */

import { useEffect, useState } from 'react'

// Modal component for displaying content in an overlay.
const Modal = ({ isOpen, onClose, children }) => {
  const [isDisplaying, setIsDisplaying] = useState(isOpen)

  // Manage the display of the modal with animations.
  useEffect(() => {
    let timeoutId
    if (isOpen) {
      setIsDisplaying(true)
    } else {
      timeoutId = setTimeout(() => setIsDisplaying(false), 500) // Delay for the exit animation.
    }

    return () => clearTimeout(timeoutId)
  }, [isOpen])

  // Prevent body scroll when modal is open.
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
