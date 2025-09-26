import { memo } from 'react';
import { CustomerFormData, FormErrors, CustomerFormProps as ICustomerFormProps, CustomerStatus } from '../../../types';
import Modal from '../ui/Modal';

interface CustomerFormProps extends ICustomerFormProps {
  isOpen: boolean;
  title: string;
  formData: CustomerFormData;
  formErrors: FormErrors;
  onFormDataChange: (data: CustomerFormData) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitLabel: string;
}

const CustomerForm = memo(function CustomerForm({
  isOpen,
  title,
  formData,
  formErrors,
  onFormDataChange,
  onSubmit,
  onClose,
  submitLabel,
}: CustomerFormProps) {

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
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="500px">
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
    </Modal>
  );
});

export default CustomerForm;