import { memo } from 'react';
import { Customer, CustomerTableProps as ICustomerTableProps } from '../../../types';

interface CustomerTableProps extends ICustomerTableProps {
  customers: Customer[];
  selectedCustomers: number[];
  selectAll: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectCustomer: (id: number) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customer: Customer) => void;
}

const CustomerTable = memo(function CustomerTable({
  customers,
  selectedCustomers,
  selectAll,
  onSelectAll,
  onSelectCustomer,
  onEditCustomer,
  onDeleteCustomer,
}: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th className="border p-2 text-left text-black">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="border p-2 text-left text-black">Name</th>
            <th className="border p-2 text-left text-black">Email</th>
            <th className="border p-2 text-left text-black">Company</th>
            <th className="border p-2 text-left text-black">Position</th>
            <th className="border p-2 text-left text-black">Status</th>
            <th className="border p-2 text-left text-black">Revenue</th>
            <th className="border p-2 text-left text-black">Location</th>
            <th className="border p-2 text-left text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: Customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="border p-2 text-black">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => onSelectCustomer(customer.id)}
                />
              </td>
              <td className="border p-2 text-black">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="border p-2 text-black">{customer.email}</td>
              <td className="border p-2 text-black">{customer.company}</td>
              <td className="border p-2 text-black">{customer.position}</td>
              <td className="border p-2 text-black">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  customer.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {customer.status}
                </span>
              </td>
              <td className="border p-2 text-black">${customer.revenue.toLocaleString()}</td>
              <td className="border p-2 text-black">{customer.address.city}, {customer.address.state}</td>
              <td className="border p-2">
                <button
                  onClick={() => onEditCustomer(customer)}
                  className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteCustomer(customer)}
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
  );
});

export default CustomerTable;