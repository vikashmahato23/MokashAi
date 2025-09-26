interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  customer,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
      <div className="bg-white rounded-lg p-6" style={{ width: '400px' }}>
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">
          Are you sure you want to delete {customer.firstName} {customer.lastName}?
        </p>
        <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
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
      </div>
    </div>
  );
}