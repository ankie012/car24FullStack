// Pagination.js
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const page = currentPage; // For compatibility with existing code
  const total = totalItems;
  const limit = itemsPerPage;

  const getPageNumbers = () => {
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {getPageNumbers().map((pg) => (
        <button
          key={pg}
          onClick={() => onPageChange(pg)}
          className={`px-3 py-1 rounded ${
            pg === page ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          {pg}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
