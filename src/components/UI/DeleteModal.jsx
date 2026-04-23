import React, { useEffect, useRef } from "react";
import Button from "../common/Button";

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement;
      modalRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Tab") {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusableElements) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        previousFocus?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-200 rounded-lg p-6 md:p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-label="Confirm deletion"
      >
        <h2 className="text-2xl font-bold text-[#0C0E16] dark:text-white mb-4">
          Confirm Deletion
        </h2>
        <p className="text-[#7E88C3] mb-6 leading-relaxed">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
