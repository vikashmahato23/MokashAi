import { NextRequest, NextResponse } from 'next/server';
import { getCustomers, addCustomer } from '../../../lib/data';
import { Customer, CustomerCreateRequest } from '../../../../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  // Simulate realistic API delay
  await delay(Math.floor(Math.random() * 500) + 500);
  
  const { searchParams } = new URL(request.url);
  
  let filteredCustomers = [...getCustomers()];
  
  // Search functionality
  const q = searchParams.get('q');
  if (q) {
    const query = q.toLowerCase();
    filteredCustomers = filteredCustomers.filter(customer => 
      customer.firstName.toLowerCase().includes(query) ||
      customer.lastName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query)
    );
  }
  
  // Status filter
  const status = searchParams.get('status');
  if (status && status !== 'all') {
    filteredCustomers = filteredCustomers.filter(customer => customer.status === status);
  }
  
  // Company filter
  const company = searchParams.get('company');
  if (company) {
    filteredCustomers = filteredCustomers.filter(customer => 
      customer.company.toLowerCase().includes(company.toLowerCase())
    );
  }
  
  // Sorting
  const sortField = searchParams.get('_sort');
  const sortOrder = searchParams.get('_order') || 'asc';
  
  if (sortField && sortField in filteredCustomers[0]) {
    filteredCustomers.sort((a: Customer, b: Customer) => {
      const aValue = a[sortField as keyof Customer];
      const bValue = b[sortField as keyof Customer];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  // Pagination
  const page = parseInt(searchParams.get('_page') || '1');
  const limit = parseInt(searchParams.get('_limit') || '10');
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedResults = filteredCustomers.slice(startIndex, endIndex);
  
  return NextResponse.json(paginatedResults, {
    headers: {
      'X-Total-Count': filteredCustomers.length.toString(),
    },
  });
}

export async function POST(request: NextRequest) {
  await delay(Math.floor(Math.random() * 500) + 500);

  try {
    const newCustomer: Omit<Customer, 'id' | 'dateCreated' | 'lastUpdated'> = await request.json();
    const customerWithId = addCustomer(newCustomer);

    return NextResponse.json(customerWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}