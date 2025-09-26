import { memo, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
  maxHeight?: string;
}

const Modal = memo(function Modal({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
  maxHeight = '80vh',
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 1000 }}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-6"
        style={{ width, maxHeight, overflowY: 'auto' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

export default Modal;