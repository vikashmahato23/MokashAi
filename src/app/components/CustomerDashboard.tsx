'use client';

import { useState, useEffect } from 'react';

export default function CustomerDashboard() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: '', end: '' });
  const [companyFilter, setCompanyFilter] = useState('');
  const [revenueMin, setRevenueMin] = useState('');
  const [revenueMax, setRevenueMax] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  useEffect(() => {
    console.log('Fetching customers...');
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterAndSortCustomers();
  }, [searchTerm, statusFilter, sortField, sortOrder, customers, dateRangeFilter, companyFilter, revenueMin, revenueMax, selectedTags]);

  useEffect(() => {
    if (selectAll) {
      setSelectedCustomers(filteredCustomers.map((c: any) => c.id));
    } else {
      setSelectedCustomers([]);
    }
  }, [selectAll, filteredCustomers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customers?_limit=100');
      const data = await response.json();
      console.log('Fetched customers:', data);
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCustomers = () => {
    let filtered = [...customers];

    if (searchTerm) {
      filtered = filtered.filter((customer: any) =>
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((customer: any) => customer.status === statusFilter);
    }

    if (companyFilter) {
      filtered = filtered.filter((customer: any) =>
        customer.company.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    if (dateRangeFilter.start && dateRangeFilter.end) {
      filtered = filtered.filter((customer: any) => {
        const created = new Date(customer.dateCreated);
        const start = new Date(dateRangeFilter.start);
        const end = new Date(dateRangeFilter.end);
        return created >= start && created <= end;
      });
    }

    if (revenueMin || revenueMax) {
      filtered = filtered.filter((customer: any) => {
        const revenue = customer.revenue;
        const min = revenueMin ? parseFloat(revenueMin) : 0;
        const max = revenueMax ? parseFloat(revenueMax) : Infinity;
        return revenue >= min && revenue <= max;
      });
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((customer: any) =>
        selectedTags.some(tag => customer.tags.includes(tag))
      );
    }

    if (sortField) {
      filtered.sort((a: any, b: any) => {
        if (sortOrder === 'asc') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (customer: any) => {
    console.log('Editing customer:', customer);
    setEditingCustomer(customer);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      position: customer.position,
      status: customer.status,
      street: customer.address.street,
      city: customer.address.city,
      state: customer.address.state,
      zipCode: customer.address.zipCode,
      revenue: customer.revenue
    });
    setShowEditModal(true);
  };

  const handleDelete = (customer: any) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/customers/${customerToDelete.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Customer deleted');
        fetchCustomers();
        setShowDeleteModal(false);
        setCustomerToDelete(null);
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert('Failed to delete customer');
    }
  };

  const validateForm = () => {
    const errors: any = {};
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
    if (formData.revenue && isNaN(formData.revenue)) errors.revenue = 'Revenue must be a number';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) return;

    try {
      const updatedCustomer = {
        ...editingCustomer,
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
          zipCode: formData.zipCode
        },
        revenue: parseFloat(formData.revenue),
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`/api/customers/${editingCustomer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCustomer)
      });

      if (response.ok) {
        console.log('Customer updated');
        fetchCustomers();
        setShowEditModal(false);
        setEditingCustomer(null);
        setFormData({});
        setFormErrors({});
      }
    } catch (err) {
      console.error('Error updating customer:', err);
      alert('Failed to update customer');
    }
  };

  const handleAddNew = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      status: 'pending',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      revenue: '',
      tags: []
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  const handleSaveNew = async () => {
    if (!validateForm()) return;

    try {
      const newCustomer = {
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
          zipCode: formData.zipCode
        },
        revenue: parseFloat(formData.revenue),
        tags: formData.tags || [],
        dateCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });

      if (response.ok) {
        console.log('Customer added');
        fetchCustomers();
        setShowAddModal(false);
        setFormData({});
        setFormErrors({});
      }
    } catch (err) {
      console.error('Error adding customer:', err);
      alert('Failed to add customer');
    }
  };

  const exportToCSV = () => {
    console.log('Export to CSV clicked');
    alert('CSV export not implemented yet');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleSelectCustomer = (id: number) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(cId => cId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading customers...</div>;
  }

  return (
    <div className="p-6" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#333' }}>Customer Dashboard</h1>
        
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ width: '300px', borderColor: '#ddd' }}
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: '#ddd' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <input
            type="text"
            placeholder="Filter by company..."
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: '#ddd' }}
          />
          
          <input
            type="date"
            value={dateRangeFilter.start}
            onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, start: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: '#ddd' }}
          />
          
          <input
            type="date"
            value={dateRangeFilter.end}
            onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, end: e.target.value })}
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: '#ddd' }}
          />
          
          <input
            type="number"
            placeholder="Min revenue"
            value={revenueMin}
            onChange={(e) => setRevenueMin(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ width: '150px', borderColor: '#ddd' }}
          />
          
          <input
            type="number"
            placeholder="Max revenue"
            value={revenueMax}
            onChange={(e) => setRevenueMax(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ width: '150px', borderColor: '#ddd' }}
          />
          
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ borderColor: '#ddd' }}
          >
            <option value="">Sort by...</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="company">Company</option>
            <option value="revenue">Revenue</option>
            <option value="dateCreated">Date Created</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            style={{ backgroundColor: '#10b981' }}
          >
            Add Customer
          </button>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            style={{ backgroundColor: '#3b82f6' }}
          >
            Export CSV
          </button>
        </div>
        
        <div className="mb-4 text-sm text-gray-600">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th className="border p-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                  />
                </th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Company</th>
                <th className="border p-2 text-left">Position</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Revenue</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer: any) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleSelectCustomer(customer.id)}
                    />
                  </td>
                  <td className="border p-2">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="border p-2">{customer.email}</td>
                  <td className="border p-2">{customer.company}</td>
                  <td className="border p-2">{customer.position}</td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="border p-2">${customer.revenue.toLocaleString()}</td>
                  <td className="border p-2">{customer.address.city}, {customer.address.state}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      style={{ backgroundColor: '#3b82f6' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      style={{ backgroundColor: '#ef4444' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
          
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="px-3 py-1 border rounded"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>
      </div>
      
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
          <div className="bg-white rounded-lg p-6" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.firstName ? 'red' : '#ddd' }}
                />
                {formErrors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.firstName}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.lastName ? 'red' : '#ddd' }}
                />
                {formErrors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.lastName}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.email ? 'red' : '#ddd' }}
                />
                {formErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.phone ? 'red' : '#ddd' }}
                />
                {formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.phone}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.company ? 'red' : '#ddd' }}
                />
                {formErrors.company && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.company}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.position ? 'red' : '#ddd' }}
                />
                {formErrors.position && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.position}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.status ? 'red' : '#ddd' }}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                {formErrors.status && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.status}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Street</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.street ? 'red' : '#ddd' }}
                />
                {formErrors.street && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.street}</span>}
              </div>
              
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.city ? 'red' : '#ddd' }}
                />
                {formErrors.city && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.city}</span>}
              </div>
              
              <div>
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.state ? 'red' : '#ddd' }}
                />
                {formErrors.state && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.state}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.zipCode ? 'red' : '#ddd' }}
                />
                {formErrors.zipCode && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.zipCode}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Revenue</label>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.revenue ? 'red' : '#ddd' }}
                />
                {formErrors.revenue && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.revenue}</span>}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCustomer(null);
                  setFormData({});
                  setFormErrors({});
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
          <div className="bg-white rounded-lg p-6" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.firstName ? 'red' : '#ddd' }}
                />
                {formErrors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.firstName}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.lastName ? 'red' : '#ddd' }}
                />
                {formErrors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.lastName}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.email ? 'red' : '#ddd' }}
                />
                {formErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.phone ? 'red' : '#ddd' }}
                />
                {formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.phone}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.company ? 'red' : '#ddd' }}
                />
                {formErrors.company && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.company}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.position ? 'red' : '#ddd' }}
                />
                {formErrors.position && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.position}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.status ? 'red' : '#ddd' }}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {formErrors.status && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.status}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Street</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.street ? 'red' : '#ddd' }}
                />
                {formErrors.street && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.street}</span>}
              </div>
              
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.city ? 'red' : '#ddd' }}
                />
                {formErrors.city && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.city}</span>}
              </div>
              
              <div>
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.state ? 'red' : '#ddd' }}
                />
                {formErrors.state && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.state}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.zipCode ? 'red' : '#ddd' }}
                />
                {formErrors.zipCode && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.zipCode}</span>}
              </div>
              
              <div>
                <label className="block mb-1">Revenue</label>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: formErrors.revenue ? 'red' : '#ddd' }}
                />
                {formErrors.revenue && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.revenue}</span>}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({});
                  setFormErrors({});
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 1000 }}>
          <div className="bg-white rounded-lg p-6" style={{ width: '400px' }}>
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete {customerToDelete?.firstName} {customerToDelete?.lastName}?
            </p>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCustomerToDelete(null);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}