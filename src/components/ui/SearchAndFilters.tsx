import { memo } from 'react';
import { SearchAndFiltersProps } from '@/types';

interface LocalSearchAndFiltersProps {
  searchTerm: string;
  statusFilter: string;
  companyFilter: string;
  dateRangeFilter: { start: string; end: string };
  revenueMin: string;
  revenueMax: string;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onCompanyFilterChange: (value: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onRevenueMinChange: (value: string) => void;
  onRevenueMaxChange: (value: string) => void;
  onSortFieldChange: (field: string) => void;
  onSortOrderToggle: () => void;
  onAddCustomer: () => void;
  onExportCSV: () => void;
}

const SearchAndFilters = memo(function SearchAndFilters({
  searchTerm,
  statusFilter,
  companyFilter,
  dateRangeFilter,
  revenueMin,
  revenueMax,
  sortField,
  sortOrder,
  onSearchTermChange,
  onStatusFilterChange,
  onCompanyFilterChange,
  onDateRangeChange,
  onRevenueMinChange,
  onRevenueMaxChange,
  onSortFieldChange,
  onSortOrderToggle,
  onAddCustomer,
  onExportCSV,
}: SearchAndFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
        style={{ width: '300px', borderColor: '#ddd' }}
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
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
        onChange={(e) => onCompanyFilterChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
        style={{ borderColor: '#ddd' }}
      />

      <input
        type="date"
        value={dateRangeFilter.start}
        onChange={(e) => onDateRangeChange({ ...dateRangeFilter, start: e.target.value })}
        className="px-4 py-2 border rounded-lg"
        style={{ borderColor: '#ddd' }}
      />

      <input
        type="date"
        value={dateRangeFilter.end}
        onChange={(e) => onDateRangeChange({ ...dateRangeFilter, end: e.target.value })}
        className="px-4 py-2 border rounded-lg"
        style={{ borderColor: '#ddd' }}
      />

      <input
        type="number"
        placeholder="Min revenue"
        value={revenueMin}
        onChange={(e) => onRevenueMinChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
        style={{ width: '150px', borderColor: '#ddd' }}
      />

      <input
        type="number"
        placeholder="Max revenue"
        value={revenueMax}
        onChange={(e) => onRevenueMaxChange(e.target.value)}
        className="px-4 py-2 border rounded-lg"
        style={{ width: '150px', borderColor: '#ddd' }}
      />

      <select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value)}
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
        onClick={onSortOrderToggle}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>

      <button
        onClick={onAddCustomer}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        style={{ backgroundColor: '#10b981' }}
      >
        Add Customer
      </button>

      <button
        onClick={onExportCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        style={{ backgroundColor: '#3b82f6' }}
      >
        Export CSV
      </button>
    </div>
  );
});

export default SearchAndFilters;