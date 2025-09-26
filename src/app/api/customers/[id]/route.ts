import { NextRequest, NextResponse } from 'next/server';
import { getCustomer, updateCustomer, deleteCustomer } from '@/lib/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(Math.floor(Math.random() * 500) + 500);
  
  const id = parseInt(params.id);
  const customer = getCustomer(id);
  
  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
  
  return NextResponse.json(customer);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(Math.floor(Math.random() * 500) + 500);
  
  const id = parseInt(params.id);
  const updatedCustomerData = await request.json();
  const updatedCustomer = updateCustomer(id, updatedCustomerData);
  
  if (!updatedCustomer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
  
  return NextResponse.json(updatedCustomer);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await delay(Math.floor(Math.random() * 500) + 500);
  
  const id = parseInt(params.id);
  const success = deleteCustomer(id);
  
  if (!success) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
  
  return NextResponse.json({ success: true });
}