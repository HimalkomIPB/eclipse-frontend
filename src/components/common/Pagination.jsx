import React from 'react';
import { usePagination } from '../../hooks/usePagination';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const handleClick = (callback) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    callback();
  };

  return (
    <ul className="inline-flex items-center justify-center gap-1 md:gap-2 mt-8 rounded-full p-1.5 md:p-2
         border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.9)_0%,rgba(14,41,59,0.92)_100%)] text-white shadow-[0_16px_32px_rgba(2,14,26,0.24)] backdrop-blur-md
         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(2,14,26,0.3)]
    ">

      {/* Tombol Previous */}
      <button
        type="button"
        onClick={handleClick(onPrevious)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`hover:cursor-pointer flex items-center justify-center rounded-full w-8 h-8 md:w-auto md:py-4 md:px-5 text-sm md:text-base transition-all duration-200
       border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.92)_100%)] text-white shadow-[0_12px_26px_rgba(2,14,26,0.22)] backdrop-blur-md hover:border-white/30 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[18px]
      `}
      >
        <span className="md:hidden">&lt;</span>
        <span className="hidden md:inline">Previous</span>
      </button>

      {/* Nomor Halaman */}
      {paginationRange.map((pageNumber, index) =>
        pageNumber === '...' ? (
          <span
            key={index}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white text-sm"
          >
            &#8230;
          </span>
        ) : (
          <button
            key={index}
            type="button"
            onClick={handleClick(() => onPageChange(pageNumber))}
            className={`hover:cursor-pointer flex items-center justify-center rounded-full w-8 h-8 md:w-10 md:h-10  text-sm md:text-base transition-colors duration-150
              ${pageNumber === currentPage
                ? 'bg-white/15 text-white font-semibold text-[18px] border border-white/25'
                : 'bg-transparent text-white/80 hover:text-white hover:bg-white/10'
              }`}
            aria-label={`Go to page ${pageNumber}`}
            {...(pageNumber === currentPage ? { 'aria-current': 'page' } : {})}
          >
            {pageNumber}
          </button>
        )
      )}

      {/* Tombol Next */}
      <button
        type="button"
        onClick={handleClick(onNext)}
        disabled={currentPage === lastPage}
        className={`hover:cursor-pointer flex items-center justify-center rounded-full w-8 h-8 md:w-auto md:py-4 md:px-6 text-sm md:text-base transition-all duration-200
       border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.92)_100%)] text-white shadow-[0_12px_26px_rgba(2,14,26,0.22)] backdrop-blur-md hover:border-white/30 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-[18px]
        `}
      >
        <span className="md:hidden">&gt;</span>
        <span className="hidden md:inline">Next</span>
      </button>
    </ul>
  );
};

export default Pagination;
