import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
  revenue: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tags: string[];
  dateCreated: string;
  lastUpdated: string;
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customers?_limit=100');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData: any) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      if (response.ok) {
        await fetchCustomers(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Failed to add customer');
      return false;
    }
  };

  const updateCustomer = async (id: number, customerData: any) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      if (response.ok) {
        await fetchCustomers(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Failed to update customer');
      return false;
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchCustomers(); // Refresh the list
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer');
      return false;
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };
}