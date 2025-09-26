import { useState, useEffect } from 'react';
import { Customer, UseCustomersReturn, CustomerCreateRequest } from '@/types';

/**
 * Custom hook for managing customer data and operations
 * Provides CRUD operations for customers with optimized state updates
 */
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches all customers from the API
   */
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

  const addCustomer = async (customerData: CustomerCreateRequest) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      if (response.ok) {
        const newCustomer = await response.json();
        setCustomers(prev => [...prev, newCustomer]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Failed to add customer');
      return false;
    }
  };

  const updateCustomer = async (id: number, customerData: Partial<Customer>) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomers(prev => prev.map(customer =>
          customer.id === id ? updatedCustomer : customer
        ));
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
        setCustomers(prev => prev.filter(customer => customer.id !== id));
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