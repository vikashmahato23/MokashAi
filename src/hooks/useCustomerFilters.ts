import { useState, useMemo, useCallback } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: string;
  revenue: number;
  dateCreated: string;
  tags: string[];
  [key: string]: any;
}

interface FilterState {
  searchTerm: string;
  statusFilter: string;
  companyFilter: string;
  dateRangeFilter: { start: string; end: string };
  revenueMin: string;
  revenueMax: string;
  selectedTags: string[];
}

interface SortState {
  field: string;
  order: 'asc' | 'desc';
}

export function useCustomerFilters(customers: Customer[]) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    companyFilter: '',
    dateRangeFilter: { start: '', end: '' },
    revenueMin: '',
    revenueMax: '',
    selectedTags: []
  });

  const [sort, setSort] = useState<SortState>({
    field: '',
    order: 'asc'
  });

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = [...customers];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(customer =>
        customer.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === filters.statusFilter);
    }

    // Apply company filter
    if (filters.companyFilter) {
      filtered = filtered.filter(customer =>
        customer.company.toLowerCase().includes(filters.companyFilter.toLowerCase())
      );
    }

    // Apply date range filter
    if (filters.dateRangeFilter.start && filters.dateRangeFilter.end) {
      filtered = filtered.filter(customer => {
        const created = new Date(customer.dateCreated);
        const start = new Date(filters.dateRangeFilter.start);
        const end = new Date(filters.dateRangeFilter.end);
        return created >= start && created <= end;
      });
    }

    // Apply revenue filter
    if (filters.revenueMin || filters.revenueMax) {
      filtered = filtered.filter(customer => {
        const revenue = customer.revenue;
        const min = filters.revenueMin ? parseFloat(filters.revenueMin) : 0;
        const max = filters.revenueMax ? parseFloat(filters.revenueMax) : Infinity;
        return revenue >= min && revenue <= max;
      });
    }

    // Apply tags filter
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(customer =>
        filters.selectedTags.some(tag => customer.tags.includes(tag))
      );
    }

    // Apply sorting
    if (sort.field) {
      filtered.sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];

        if (sort.order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [customers, filters, sort]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const updateSort = useCallback((field: string) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      statusFilter: 'all',
      companyFilter: '',
      dateRangeFilter: { start: '', end: '' },
      revenueMin: '',
      revenueMax: '',
      selectedTags: []
    });
  }, []);

  return {
    filters,
    sort,
    filteredCustomers: filteredAndSortedCustomers,
    updateFilters,
    updateSort,
    clearFilters
  };
}