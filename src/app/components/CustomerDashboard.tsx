'use client';

import { useState, useMemo, useCallback } from 'react';
import { Customer } from '../../../types';
import { useCustomers } from '../../hooks/useCustomers';
import { useCustomerFilters } from '../../hooks/useCustomerFilters';
import { useCustomerForm } from '../../hooks/useCustomerForm';
import SearchAndFilters from '../../components/ui/SearchAndFilters';
import CustomerTable from '../../components/ui/CustomerTable';
import Pagination from '../../components/ui/Pagination';
import CustomerForm from '../../components/forms/CustomerForm';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';

export default function CustomerDashboard() {
  // Custom hooks for data and business logic
  const { customers, loading, error, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const { filters, sort, filteredCustomers, updateFilters, updateSort } = useCustomerFilters(customers);
  const { formData, formErrors, setFormData, validateForm, initializeForm } = useCustomerForm();

  // Local UI state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Pagination calculations - memoized for performance
  const paginationData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    return {
      indexOfLastItem,
      indexOfFirstItem,
      currentCustomers,
      totalPages
    };
  }, [currentPage, itemsPerPage, filteredCustomers]);

  const { indexOfLastItem, indexOfFirstItem, currentCustomers, totalPages } = paginationData;

  // Event handlers - memoized to prevent unnecessary re-renders
  const handleSelectAll = useCallback((checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedCustomers(currentCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  }, [currentCustomers]);

  const handleSelectCustomer = useCallback((id: number) => {
    setSelectedCustomers(prev =>
      prev.includes(id)
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    );
  }, []);

  const handleEditCustomer = useCallback((customer: Customer) => {
    setEditingCustomer(customer);
    initializeForm(customer);
    setShowEditModal(true);
  }, [initializeForm]);

  const handleAddCustomer = useCallback(() => {
    initializeForm();
    setShowAddModal(true);
  }, [initializeForm]);

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!validateForm() || !editingCustomer) return;

    const customerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      revenue: parseFloat(formData.revenue),
    };

    const success = await updateCustomer(editingCustomer.id, customerData);
    if (success) {
      setShowEditModal(false);
      setEditingCustomer(null);
      initializeForm();
    }
  }, [validateForm, editingCustomer, formData, updateCustomer, initializeForm]);

  const handleSaveNew = useCallback(async () => {
    if (!validateForm()) return;

    const newCustomerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      revenue: parseFloat(formData.revenue),
      tags: formData.tags || [],
    };

    const success = await addCustomer(newCustomerData);
    if (success) {
      setShowAddModal(false);
      initializeForm();
    }
  }, [validateForm, formData, addCustomer, initializeForm]);

  const handleConfirmDelete = useCallback(async () => {
    if (!customerToDelete) return;

    const success = await deleteCustomer(customerToDelete.id);
    if (success) {
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  }, [customerToDelete, deleteCustomer]);

  const handleCloseModal = useCallback(() => {
    setShowEditModal(false);
    setShowAddModal(false);
    setShowDeleteModal(false);
    setEditingCustomer(null);
    setCustomerToDelete(null);
    initializeForm();
  }, [initializeForm]);

  const handleExportCSV = useCallback(() => {
    console.log('Export to CSV clicked');
    alert('CSV export not implemented yet');
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSelectAll(false);
    setSelectedCustomers([]);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectAll(false);
    setSelectedCustomers([]);
  }, []);

  // Loading and error states
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading customers...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Customer Dashboard
        </h1>

        <SearchAndFilters
          searchTerm={filters.searchTerm}
          statusFilter={filters.statusFilter}
          companyFilter={filters.companyFilter}
          dateRangeFilter={filters.dateRangeFilter}
          revenueMin={filters.revenueMin}
          revenueMax={filters.revenueMax}
          sortField={sort.field}
          sortOrder={sort.order}
          onSearchTermChange={(value) => updateFilters({ searchTerm: value })}
          onStatusFilterChange={(value) => updateFilters({ statusFilter: value })}
          onCompanyFilterChange={(value) => updateFilters({ companyFilter: value })}
          onDateRangeChange={(range) => updateFilters({ dateRangeFilter: range })}
          onRevenueMinChange={(value) => updateFilters({ revenueMin: value })}
          onRevenueMaxChange={(value) => updateFilters({ revenueMax: value })}
          onSortFieldChange={updateSort}
          onSortOrderToggle={() => updateSort(sort.field)}
          onAddCustomer={handleAddCustomer}
          onExportCSV={handleExportCSV}
        />

        <CustomerTable
          customers={currentCustomers}
          selectedCustomers={selectedCustomers}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSelectCustomer={handleSelectCustomer}
          onEditCustomer={handleEditCustomer}
          onDeleteCustomer={handleDeleteCustomer}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredCustomers.length}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* Modals */}
      <CustomerForm
        isOpen={showEditModal}
        title="Edit Customer"
        formData={formData}
        formErrors={formErrors}
        onFormDataChange={setFormData}
        onSubmit={handleSaveEdit}
        onClose={handleCloseModal}
        submitLabel="Save Changes"
      />

      <CustomerForm
        isOpen={showAddModal}
        title="Add New Customer"
        formData={formData}
        formErrors={formErrors}
        onFormDataChange={setFormData}
        onSubmit={handleSaveNew}
        onClose={handleCloseModal}
        submitLabel="Add Customer"
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        customer={customerToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseModal}
      />
    </div>
  );
}