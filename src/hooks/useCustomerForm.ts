import { useState, useCallback } from 'react';
import { CustomerFormData, FormErrors, Customer, CustomerStatus, UseCustomerFormReturn } from '../../types';

const initialFormData: CustomerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  status: CustomerStatus.PENDING,
  street: '',
  city: '',
  state: '',
  zipCode: '',
  revenue: '',
  tags: []
};

export function useCustomerForm() {
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = useCallback(() => {
    const errors: FormErrors = {};

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (formData.email && !formData.email.includes('@')) errors.email = 'Invalid email';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.company) errors.company = 'Company is required';
    if (!formData.position) errors.position = 'Position is required';
    if (!formData.status) errors.status = 'Status is required';
    if (!formData.street) errors.street = 'Street is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'Zip code is required';
    if (formData.revenue && isNaN(parseFloat(formData.revenue))) errors.revenue = 'Revenue must be a number';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormErrors({});
  }, []);

  const initializeForm = useCallback((customer?: Customer) => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        company: customer.company || '',
        position: customer.position || '',
        status: customer.status || CustomerStatus.PENDING,
        street: customer.address?.street || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        zipCode: customer.address?.zipCode || '',
        revenue: customer.revenue ? customer.revenue.toString() : '',
        tags: customer.tags || []
      });
    } else {
      setFormData(initialFormData);
    }
    setFormErrors({});
  }, []);

  return {
    formData,
    formErrors,
    setFormData,
    validateForm,
    resetForm,
    initializeForm
  };
}