import { memo } from 'react';
import { PaginationProps as IPaginationProps } from '../../../types';

interface PaginationProps extends IPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  return (
    <>
      <div className="mb-4 text-sm text-black">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} customers
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-black rounded disabled:opacity-50 text-black"
          >
            First
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-black rounded disabled:opacity-50 text-black"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-black rounded disabled:opacity-50 text-black"
          >
            Next
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-black rounded disabled:opacity-50 text-black"
          >
            Last
          </button>
        </div>

        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="px-3 py-1 border border-black rounded text-black"
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>
    </>
  );
});

export default Pagination;