import { memo } from 'react';
import { Customer, DeleteConfirmationModalProps as IDeleteConfirmationModalProps } from '../../../types';
import Modal from '../ui/Modal';

interface DeleteConfirmationModalProps extends IDeleteConfirmationModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = memo(function DeleteConfirmationModal({
  isOpen,
  customer,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Confirm Delete"
      width="400px"
    >
      <p className="mb-4 text-black">
        Are you sure you want to delete {customer.firstName} {customer.lastName}?
      </p>
      <p className="text-sm text-black mb-6">This action cannot be undone.</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-black rounded hover:bg-gray-100 text-black"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
});

export default DeleteConfirmationModal;