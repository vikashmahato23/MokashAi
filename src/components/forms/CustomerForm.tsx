interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  revenue: string;
}

interface CustomerFormErrors {
  [key: string]: string;
}

interface CustomerFormProps {
  isOpen: boolean;
  title: string;
  formData: CustomerFormData;
  formErrors: CustomerFormErrors;
  onFormDataChange: (data: CustomerFormData) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitLabel: string;
}

export default function CustomerForm({
  isOpen,
  title,
  formData,
  formErrors,
  onFormDataChange,
  onSubmit,
  onClose,
  submitLabel,
}: CustomerFormProps) {
  if (!isOpen) return null;

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const renderInput = (
    label: string,
    field: keyof CustomerFormData,
    type: string = 'text'
  ) => (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full px-3 py-2 border rounded"
        style={{ borderColor: formErrors[field] ? 'red' : '#ddd' }}
      />
      {formErrors[field] && (
        <span style={{ color: 'red', fontSize: '12px' }}>{formErrors[field]}</span>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
      <div className="bg-white rounded-lg p-6" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <div className="space-y-4">
          {renderInput('First Name', 'firstName')}
          {renderInput('Last Name', 'lastName')}
          {renderInput('Email', 'email', 'email')}
          {renderInput('Phone', 'phone')}
          {renderInput('Company', 'company')}
          {renderInput('Position', 'position')}

          <div>
            <label className="block mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: formErrors.status ? 'red' : '#ddd' }}
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {formErrors.status && (
              <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.status}</span>
            )}
          </div>

          {renderInput('Street', 'street')}
          {renderInput('City', 'city')}
          {renderInput('State', 'state')}
          {renderInput('Zip Code', 'zipCode')}
          {renderInput('Revenue', 'revenue', 'number')}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}