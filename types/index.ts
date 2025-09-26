// Incomplete type definitions - candidates should improve these

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // TODO: Add more fields
  [key: string]: any; // This is bad practice!
};

export interface Address {
  street?: string;
  city?: string;
  // Missing state and zipCode
}

// Using 'any' type - should be properly typed
export type FilterOptions = any;

export type SortOptions = {
  field: string;
  order: 'asc' | 'desc';
};

// Missing proper status enum
export type CustomerStatus = string;

// Incomplete form data type
export interface FormData {
  [key: string]: any;
}

// Response types are missing
export type ApiResponse = any;

// Pagination types are incomplete
export interface PaginationParams {
  page?: number;
  // Missing limit and other params
}