// Comprehensive TypeScript type definitions

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: CustomerStatus;
  dateCreated: string;
  lastUpdated: string;
  address: Address;
  tags: string[];
  revenue: number;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: CustomerStatus;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  revenue: string;
  tags?: string[];
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  status?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  revenue?: string;
}

export interface FilterOptions {
  searchTerm: string;
  statusFilter: CustomerStatus | 'all';
  companyFilter: string;
  dateRangeFilter: {
    start: string;
    end: string;
  };
  revenueMin: string;
  revenueMax: string;
  selectedTags: string[];
}

export interface SortOptions {
  field: keyof Customer | '';
  order: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface CustomerListResponse {
  customers: Customer[];
  totalCount: number;
}

// Hook return types
export interface UseCustomersReturn {
  customers: Customer[];
  loading: boolean;
  error: string;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id' | 'dateCreated' | 'lastUpdated'>) => Promise<boolean>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<boolean>;
  deleteCustomer: (id: number) => Promise<boolean>;
}

export interface UseCustomerFiltersReturn {
  filters: FilterOptions;
  sort: SortOptions;
  filteredCustomers: Customer[];
  updateFilters: (filters: Partial<FilterOptions>) => void;
  updateSort: (field: string) => void;
  clearFilters: () => void;
}

export interface UseCustomerFormReturn {
  formData: CustomerFormData;
  formErrors: FormErrors;
  setFormData: (data: CustomerFormData) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  initializeForm: (customer?: Customer) => void;
}

// Component props types
export interface SearchAndFiltersProps {
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

export interface CustomerTableProps {
  customers: Customer[];
  selectedCustomers: number[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectCustomer: (id: number) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface CustomerFormProps {
  isOpen: boolean;
  title: string;
  formData: CustomerFormData;
  formErrors: FormErrors;
  onFormDataChange: (data: CustomerFormData) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitLabel: string;
}

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onConfirm: () => void;
  onCancel: () => void;
}

// Utility types
export type CustomerWithoutTimestamps = Omit<Customer, 'dateCreated' | 'lastUpdated'>;
export type CustomerCreateRequest = Omit<Customer, 'id' | 'dateCreated' | 'lastUpdated'>;
export type CustomerUpdateRequest = Partial<Omit<Customer, 'id' | 'dateCreated'>> & { lastUpdated?: string };

// Error types
export interface ApiError {
  message: string;
  status: number;
  details?: string;
}

export type AsyncActionResult<T = void> = Promise<{ success: boolean; data?: T; error?: string }>;